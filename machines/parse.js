module.exports = {


  friendlyName: 'Parse date/time',


  description: 'Parse a Unix timestamp from a string containing a human-readable date and/or time.',


  extendedDescription: 'Given a parseable datetime string, returns a Unix timestamp for that date (number of miliseconds since January 1, 1970 at midnight, GMT.)  Otherwise returns the current timestamp.',


  inputs: {

    datetimeString: {
      friendlyName: 'Date/time string',
      description: 'A string containing a human-readable date and/or time.',
      example: '2015-03-19T11:43:18-06:00'
    },

    // TODO: support this in `fn`
    // timezone: {
    //   friendlyName: 'Timezone offset',
    //   description: 'The timezone offset from UTC/GMT (in hours) to assume if it cannot be parsed.',
    //   extendedDescription: 'If a timezone cannot be parsed from the date/time string, this timezone offset will be used instead.  Defaults to 0 (GMT/UTC).'
    //   example: -6,
    //   defaultsTo: 0
    // }

  },


  defaultExit: 'success',


  exits: {

    success: {
      variableName: 'epochMs',
      description: 'Returns the number of miliseconds elapsed between midnight (GMT) on January 1, 1970 and the parsed date/time.',
      example: 1426786998000
    },

    badDatetimeString: {
      friendlyName: 'could not parse',
      description: 'Could not parse a time or date from the provided string.',
    }

  },


  fn: function (inputs,exits) {
    var Moment = require('moment');

    // Default to current date/time
    if (typeof inputs.datetimeString === 'undefined') {
      return exits.success(Moment().toDate().getTime());
    }

    // Or use the specified timestamp
    var momentDatetime = Moment(new Date(inputs.datetimeString));
    if (!momentDatetime.isValid()) {
      return exits.badDatetimeString();
    }
    return exits.success(momentDatetime.toDate().getTime());

    // For posterity:
    // ======================================================================
    //
    // To create non-JS Unix timestamp (e.g. seconds rather than ms), use =>
    // Moment(someDatetimeStr).unix();
    //
    // To parse from non-JS Unix timestamp (e.g. seconds rather than ms), use =>
    // Moment.unix(numSecondsSinceEpoch);
  }

};
