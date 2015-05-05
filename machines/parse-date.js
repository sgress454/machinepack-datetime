module.exports = {


  friendlyName: 'Parse date',


  description: 'Parse a string containing a human-readable date.',


  cacheable: true,


  sync: true,


  inputs: {

    monthDayYear: {
      friendlyName: 'Date string',
      description: 'A string containing a human-readable date (but not a time or timezone).',
      example: 'March 19, 2015',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Returns structured information about the date.',
      extendedDescription: '`date` is 1-indexed, `month` is 1-indexed, and `dayOfWeek` is 1-indexed starting with Sunday.',
      example: {
        month: 11,
        date: 25,
        year: 2015,
        dayOfWeek: 'Monday',
      }
    },

    couldNotParse: {
      friendlyName: 'could not parse',
      description: 'Could not parse a date from the provided string.',
    }

  },


  fn: function (inputs,exits) {

    var Moment = require('moment');

    var momentObj = Moment(Date.parse(inputs.monthDayYear));

    if (!momentObj.isValid()) {
      return exits.couldNotParse();
    }

    return exits.success({
      month: momentObj.month()+1,
      date: momentObj.date(),
      year: momentObj.year(),
      dayOfWeek: momentObj.format('dddd')
    });
  }

};
