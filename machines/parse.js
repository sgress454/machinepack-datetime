module.exports = {


  friendlyName: 'Parse date/time',


  description: 'Parse a string containing a human-readable date, time, and/or timezone.',


  inputs: {

    datetimeString: {
      friendlyName: 'Date/time string',
      description: 'A string containing a human-readable date and/or time and/or timezone.',
      example: 'March 19, 2015 11:43 AM'
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Returns information about the date/time.',
      example: {
        hasDate: true,
        hasTime: true,
        hasTimezone: true
      }
    },

    badDatetimeString: {
      friendlyName: 'could not parse',
      description: 'Could not parse a date, time, or timezone from the provided string.',
    }

  },


  fn: function (inputs,exits) {
    var Moment = require('moment');

    var datetimeStr = '2015-03-18T16:10:00.001-0400';
    var utcOffset = moment.parseZone(datetimeStr).UTCcOffset();

    // Default to current date/time, using provided timezone offset
    // or defaulting to UTC/GMT
    if (typeof inputs.datetimeString === 'undefined') {
      return exits.success(Moment().toDate().getTime());
    }

    // Or attempt to parse the specified date/time string
    var parsedMomentObj = Moment.parseZone(inputs.datetimeString);

    // var momentDatetime = Moment(new Date(inputs.datetimeString));
    if (!parsedMomentObj.isValid()) {
      return exits.badDatetimeString();
    }

    // Now that we know the datetime string was valid, we'll determine
    // whether it contained a timezone
    // TODO: improve this-- this does false negatives when GMT is manually specified
    if (parsedMomentObj.zone() !== 0) {
      // If it DID contain a timezone, we're good, return the js epoch timestamp.
      return exits.success(parsedMomentObj.toDate().getTime());
    }

    // If it DID NOT contain a timezone, we will **RE-PARSE** the datetime
    // string using the specified timezone offset (or GMT/UTC if unspecified)
    Moment(new Date());
    // Then return the js epoch timestamp based on that newly parsed date/time.



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
