module.exports = {


  friendlyName: 'Parse time',


  description: 'Parse a string containing a human-readable time.',


  cacheable: true,


  sync: true,


  inputs: {

    timeString: {
      friendlyName: 'Time string',
      description: 'A string containing a human-readable time (but not a date or timezone).',
      example: '2:30 PM',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'time',
      description: 'Returns structured information about the time.',
      extendedDescription: '`hour` (0-23), `minute` (0-59), `second` (0-59), and `millisecond` (0-999) are all 0-indexed.',
      example: {
        hour: 14,
        minute: 30,
        second: 0,
        millisecond: 0
      }
    },

    couldNotParse: {
      friendlyName: 'could not parse',
      description: 'Could not parse a time from the provided string.',
    }

  },


  fn: function (inputs,exits) {

    var Moment = require('moment');

    // Parse the time string as an hour of a particularly boring day
    // and timezone (January 1, 2000 GMT) for simplicity
    var momentObj = Moment(Date.parse('1/1/0000 ' + inputs.timeString + ' GMT-0000'));
    momentObj.utc();

    if (!momentObj.isValid()) {
      return exits.couldNotParse();
    }

    return exits.success({
      hour: momentObj.hour(),
      minute: momentObj.minute(),
      second: momentObj.second(),
      millisecond: momentObj.millisecond()
    });
  }

};
