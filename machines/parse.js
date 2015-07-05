module.exports = {


  friendlyName: 'Parse JSON date/time',


  description: 'Parse a JSON-formatted (ISO 8601) date/time string into a JS timestamp (epoch ms).',


  sync: true,


  cacheable: true,


  inputs: {

    datetime: {
      friendlyName: 'JSON date',
      description: 'The JSON-formatted (ISO 8601) date/time',
      example: '2015-05-06T00:49:45.767Z',
      required: true
    }

  },


  exits: {

    invalidDatetime: {
      friendlyName: 'invalid date/time',
      description: 'Could not build a date/time from the provided information.',
    },

    success: {
      variableName: 'timestamp',
      description: 'Returns JS timestamp (milliseconds since midnight on Jan 1, 1970 GMT)',
      example: 1430856000000
    }

  },


  fn: function (inputs,exits) {

    var MomentTz = require('moment-timezone');

    // Build moment date using GMT in order to check validity
    // (JSON-stringified datetimes are always encoded using the GMT timezone)
    var momentObj = MomentTz.tz(Date.parse(inputs.datetime), 'Etc/Greenwich');
    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Extract the absolute JS timestamp
    // (# of milliseconds since Jan 1, 1970 at midnight, GMT)
    var jsTimestamp = momentObj.valueOf();
    return exits.success(jsTimestamp);
  }


};
