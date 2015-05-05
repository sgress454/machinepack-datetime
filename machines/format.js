module.exports = {


  friendlyName: 'Format date/time',


  description: 'Build a date/time string from a Unix timestamp (miliseconds).',


  extendedDescription: 'If no timestamp is provided, the current date and time will be used.',


  inputs: {

    timestamp: {
      description: 'A Unix timestamp (ms)',
      extendedDescription: 'The number of miliseconds since midnight (GMT) on January 1, 1970.',
      example: 1318781876
    },

    formatString: {
      friendlyName: 'Format',
      description: 'A format string that will be used to format the date',
      extendedDescription: 'YYYY represents the year, "MM" the month (0-11), "DD" the date (0-indexed), "HH" the hour (0-23), "mm" the minute (0-59), "ss" the second (0-59), and "Z" the timezone difference from GMT/UTC.',
      example: 'YYYY-MM-DD HH:mm:ss Z',
      defaultsTo: 'YYYY-MM-DD HH:mm:ss Z'
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: '2015-27-19 12:27:44 -07:00'
    },

    invalidTimestamp: {
      friendlyName: 'Invalid timestamp'
    }

  },


  fn: function (inputs,exits) {
    var moment = require('moment');
    var dateObj;
    if (typeof inputs.timestamp !== 'undefined') {
      dateObj = moment.unix(inputs.timestamp);
      if (!dateObj.isValid()) {
        return exits.invalidTimestamp();
      }
    } else {
      dateObj = moment();
    }
    var format = inputs.formatString || 'YYYY-MM-DD HH:mm:ss Z';
    return exits.success(dateObj.format(format));
  }



};
