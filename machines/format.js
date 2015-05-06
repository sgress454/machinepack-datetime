module.exports = {


  friendlyName: 'Format timestamp',


  description: 'Convert a timestamp and timezone into a human readable date/time.',


  inputs: {

    timestamp: {
      friendlyName: 'Timestamp',
      description: 'An epoch offset (in milliseconds)',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000
    },

    timezone: {
      description: 'A human-readable timezone name.',
      example: 'America/Chicago',
      required: true
    }

  },


  exits: {

    success: {
      description: 'Returns human readable date+time string.',
      example: '2011-10-16 16:17:56 +00:00'
    },

    unknownTimezone: {
      friendlyName: 'invalid timezone',
      description: 'Unrecognized timezone.'
    },

    invalidDatetime: {
      friendlyName: 'invalid date/time/zone',
      description: 'Could not build a date/time/zone from the provided timestamp.',
    }

  },


  fn: function (inputs,exits) {

    var _ = require('lodash');
    var MomentTz = require('moment-timezone');

    // Default to current date/time/zone if no timestamp was provided.
    inputs.timestamp = _.isUndefined(inputs.timestamp) ? (new Date()).getTime() : inputs.timestamp;

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

    // Build moment date using appropriate timezone
    var momentObj = MomentTz.tz(inputs.timestamp, foundTimezone);
    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Format date
    var resultStr = momentObj.format();
    return exits.success(resultStr);
  }


};
