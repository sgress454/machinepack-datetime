module.exports = {


  friendlyName: 'Parse JSON timestamp',


  description: 'Parse JSON-formatted (ISO 8601) date/time into a JS timestamp.',


  sync: true,


  cacheable: true,


  inputs: {

    datetime: {
      friendlyName: 'JSON date',
      description: 'The JSON-formatted (ISO 8601) date/time',
      example: '2015-05-06T00:49:45.767Z',
      required: true
    },

    timezone: {
      description: 'A human-readable timezone name.',
      example: 'America/Chicago',
      required: true
    }

  },


  exits: {

    invalidDatetime: {
      friendlyName: 'invalid date/time',
      description: 'Could not build a date/time from the provided information.',
    },

    unknownTimezone: {
      friendlyName: 'invalid timezone',
      description: 'Unrecognized timezone.'
    },

    success: {
      variableName: 'timestamp',
      description: 'Returns JS timestamp (milliseconds since midnight on Jan 1, 1970 GMT)',
      example: 1430856000000
    }

  },


  fn: function (inputs,exits) {

    var _ = require('lodash');
    var MomentTz = require('moment-timezone');

    // Validate this is a known timezone
    // (case-insensitive)
    var foundTimezone = _.find(MomentTz.tz.names(), function (timezoneName){
      if (inputs.timezone.toLowerCase().match(timezoneName.toLowerCase())) {
        return timezoneName;
      }
    });
    if (!foundTimezone) {
      return exits.unknownTimezone();
    }

    // Build moment date using appropriate timezone in order to check validity
    var momentObj = MomentTz.tz(Date.parse(inputs.datetime), foundTimezone);
    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Extract the absolute JS timestamp
    // (# of milliseconds since Jan 1, 1970 at midnight, GMT)
    var jsTimestamp = momentObj.valueOf();
    return exits.success(jsTimestamp);
  }


};
