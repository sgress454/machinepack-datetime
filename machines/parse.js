module.exports = {


  friendlyName: 'Parse date/time',


  description: 'Parse a Unix timestamp from a string containing a human-readable date and/or time.',


  extendedDescription: 'Given a parseable datetime string, returns a Unix timestamp for that date (number of miliseconds since January 1, 1970 at midnight, GMT.)  Otherwise returns the current timestamp.',


  inputs: {

    datetimeString: {
      example: '2015-03-19T11:43:18-06:00'
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      variableName: 'epochMs',
      description: 'Returns the number of miliseconds elapsed between midnight (GMT) on January 1, 1970 and the parsed date/time.',
      example: 1318781876
    },

    badDatetimeString: {
      friendlyName: 'Could not parse a time or date from the provided string.',
      void: true
    }

  },


  fn: function (inputs,exits) {
    var moment = require('moment');
    if (inputs.datetimeString) {
      var dateObj = moment(inputs.datetimeString);
      if (!dateObj.isValid()) {
        return exits.badDatetimeString();
      }
      return exits.success(dateObj.unix());
    }
    return exits.success(moment().unix());
  }

};
