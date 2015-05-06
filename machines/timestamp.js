module.exports = {


  friendlyName: 'Construct timestamp',


  description: 'Construct an absolute timestamp from date/time/timezone data.',


  sync: true,


  cacheable: true,


  inputs: {

    date: {
      description: 'Structured information about an exact date (timezone-agnostic)',
      extendedDescription: '`date` is 1-indexed, `month` is 1-indexed, and `dayOfWeek` is 1-indexed starting with Sunday.',
      example: {
        month: 12,
        date: 25,
        year: 2015
      },
      required: true
    },

    time: {
      description: 'Structured information representing an exact time (timezone-agnostic)',
      extendedDescription: '`hour` (0-23), `minute` (0-59), `second` (0-59), and `millisecond` (0-999) are all 0-indexed.',
      example: {
        hour: 14,
        minute: 30,
        second: 0,
        millisecond: 0
      },
      required: true
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
      description: 'Done.',
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
      hour: inputs.time.hour,
      minute: inputs.time.minute,
      second: inputs.time.second,
      millisecond: inputs.time.millisecond,
      day: inputs.date.date,
      month: inputs.date.month-1,
      year: inputs.date.year
    }, foundTimezone);

    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Extract the absolute JS timestamp
    // (# of milliseconds since Jan 1, 1970 at midnight, GMT)
    var jsTimestamp = momentObj.valueOf();

    return exits.success(jsTimestamp);
  },



};





// description: 'Parse an absolute JS timestamp from a string containing a human-readable date and/or time.',


//   extendedDescription: 'Given a parseable datetime string, returns an absolute JS timestamp for that date (number of miliseconds since January 1, 1970 at midnight, GMT.)  Otherwise returns the timestamp for the current date/time.',


//   inputs: {

//     datetimeString: {
//       friendlyName: 'Date/time string',
//       description: 'A string containing a human-readable date and/or time and/or timezone.',
//       example: '2015-03-19T11:43:18-06:00'
//     },

//     timezoneOffset: {
//       friendlyName: 'Timezone offset',
//       description: 'If a timezone cannot be parsed, the timezone offset to assume (from UTC/GMT, in hours)',
//       extendedDescription: 'If a timezone cannot be parsed from the date/time string, this timezone offset will be used instead.  Defaults to 0 (GMT/UTC).',
//       example: -6,
//       defaultsTo: 0
//     }

//   },


//   defaultExit: 'success',


//   exits: {

//     success: {
//       variableName: 'epochMs',
//       description: 'Returns the number of miliseconds elapsed between midnight (GMT) on January 1, 1970 and the parsed date/time.',
//       moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
//       example: 1426786998000
//     },

//     badDatetimeString: {
//       friendlyName: 'could not parse',
//       description: 'Could not parse a time or date from the provided string.',
//     }

//   },


//   fn: function (inputs,exits) {
//     var Moment = require('moment');

//     var datetimeStr = '2015-03-18T16:10:00.001-0400';
//     var utcOffset = moment.parseZone(datetimeStr).UTCcOffset();

//     // Default to current date/time, using provided timezone offset
//     // or defaulting to UTC/GMT
//     if (typeof inputs.datetimeString === 'undefined') {
//       return exits.success(Moment().toDate().getTime());
//     }

//     // Or attempt to parse the specified date/time string
//     var parsedMomentObj = Moment.parseZone(inputs.datetimeString);

//     // var momentDatetime = Moment(new Date(inputs.datetimeString));
//     if (!parsedMomentObj.isValid()) {
//       return exits.badDatetimeString();
//     }

//     // Now that we know the datetime string was valid, we'll determine
//     // whether it contained a timezone
//     // TODO: improve this-- this does false negatives when GMT is manually specified
//     if (parsedMomentObj.zone() !== 0) {
//       // If it DID contain a timezone, we're good, return the js epoch timestamp.
//       return exits.success(parsedMomentObj.toDate().getTime());
//     }

//     // If it DID NOT contain a timezone, we will **RE-PARSE** the datetime
//     // string using the specified timezone offset (or GMT/UTC if unspecified)
//     Moment(new Date());
//     // Then return the js epoch timestamp based on that newly parsed date/time.



//     // For posterity:
//     // ======================================================================
//     //
//     // To create non-JS Unix timestamp (e.g. seconds rather than ms), use =>
//     // Moment(someDatetimeStr).unix();
//     //
//     // To parse from non-JS Unix timestamp (e.g. seconds rather than ms), use =>
//     // Moment.unix(numSecondsSinceEpoch);
//   }






    // Build moment date UTC-style (as if it was using the UTC timezone)
    // var momentObj = MomentTz.utc({
    //   hour: 14,
    //   minute: 30,
    //   second: 0,
    //   day: 25,
    //   month: 11,
    //   year: 2015
    // });
