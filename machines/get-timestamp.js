module.exports = {


  friendlyName: 'Get timestamp',


  description: 'Get a Unix timestamp.',


  extendedDescription: 'Given a parseable datetime string, returns a Unix timestamp for that date.  Otherwise returns the current timestamp.',


  inputs: {

    datetimeString: {
      example: "2015-03-19T11:43:18-06:00"
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: 1318781876
    },

    badDatetimeString: {
      friendlyName: "Bad datetime string",
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
