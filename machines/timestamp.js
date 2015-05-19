module.exports = {


  friendlyName: 'Construct JS timestamp',


  description: 'Construct an absolute timestamp from date/time/timezone data.',


  sync: true,


  cacheable: true,


  inputs: {

    year: {
      friendlyName: 'Year',
      description: 'The four-digit year.',
      example: 2015,
      required: true
    },

    month: {
      friendlyName: 'Month',
      description: 'The month (numeric, 1-12)',
      example: 12,
      required: true
    },

    date: {
      friendlyName: 'Day',
      description: 'The day of the month (1-31)',
      example: 25,
      required: true
    },

    hour: {
      friendlyName: 'Hour',
      description: 'The hour of the day (0-23)',
      example: 14,
      required: true
    },

    minute: {
      friendlyName: 'Minute',
      description: 'The minute of the day (0-59)',
      example: 30,
      required: true
    },

    second: {
      friendlyName: 'Second',
      description: 'The second within the minute (0-59)',
      example: 1,
      defaultsTo: 0
    },

    millisecond: {
      friendlyName: 'Millisecond',
      description: 'The precise millisecond within the second (0-999)',
      example: 1,
      defaultsTo: 0
    },

    timezone: {
      description: 'A human-readable timezone name.',
      example: 'America/Chicago',
      required: true
    }

  },


  exits: {

    unknownTimezone: {
      friendlyName: 'invalid timezone',
      description: 'Unrecognized timezone.'
    },

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


    // Build moment date using appropriate timezone
    var momentObj = MomentTz.tz({
      hour: inputs.hour,
      minute: inputs.minute,
      second: inputs.second,
      millisecond: inputs.millisecond,
      day: inputs.date,
      month: inputs.month-1,
      year: inputs.year
    }, foundTimezone);

    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Extract the absolute JS timestamp
    // (# of milliseconds since Jan 1, 1970 at midnight, GMT)
    var jsTimestamp = momentObj.valueOf();

    return exits.success(jsTimestamp);
  }


};
