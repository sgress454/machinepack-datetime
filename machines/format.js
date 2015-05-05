module.exports = {


  friendlyName: 'Format date/time',


  description: 'Build a date/time string from a Unix timestamp (miliseconds).',


  extendedDescription: 'If no timestamp is provided, the current date and time will be used.',


  inputs: {

    timestamp: {
      friendlyName: 'Timestamp',
      description: 'A Unix timestamp (in miliseconds)',
      extendedDescription: 'The number of miliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000
    },

    format: {
      friendlyName: 'Desired format',
      description: 'A format string that will be used to format the date',
      extendedDescription: 'YYYY represents the year, "MM" the month (0-11), "DD" the date (0-indexed), "HH" the hour (0-23), "mm" the minute (0-59), "ss" the second (0-59), and "Z" the timezone difference from GMT/UTC.',
      example: 'YYYY-MM-DD HH:mm:ss Z',
      defaultsTo: 'YYYY-MM-DD HH:mm:ss Z'
    },

    // TODO: support this in `fn`
    // timezone: {
    //   friendlyName: 'Timezone offset',
    //   description: 'The timezone offset from UTC/GMT (in hours)',
    //   extendedDescription: 'By default, the formatted date/time string returned will use the UTC/GMT timezone.'
    //   example: -6,
    //   defaultsTo: 0
    // }

  },


  exits: {

    success: {
      description: 'Returns formatted date/time string (GMT/UTC timezone)',
      example: '2011-10-16 16:17:56 +00:00'
    },

    invalidTimestamp: {
      friendlyName: 'Invalid timestamp'
    }

  },


  fn: function (inputs,exits) {
    var Moment = require('moment');

    // Default to current date/time
    if (typeof inputs.timestamp === 'undefined') {
      return exits.success(Moment.utc().format(inputs.format));
    }

    // Or use the specified timestamp
    var dateObj = Moment.utc(inputs.timestamp);
    if (!dateObj.isValid()) {
      return exits.invalidTimestamp();
    }
    return exits.success(dateObj.format(inputs.format));
  }



};
