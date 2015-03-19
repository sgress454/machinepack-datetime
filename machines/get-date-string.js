module.exports = {


  friendlyName: 'Get date string',


  description: 'Given a Unix timestamp and a date format string, return a date string.',


  extendedDescription: 'If no timestamp is provided, the current date and time will be used.  Default format is "YYYY-MM-DD HH:mm:ss Z".',


  inputs: {

    timestamp: {
      example: 1318781876
    },

    formatString: {
      example: 'YYYY-MM-DD HH:mm:ss Z'
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
    if (typeof inputs.timestamp != 'undefined') {
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
