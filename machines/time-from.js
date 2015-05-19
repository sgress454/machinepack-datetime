module.exports = {


  friendlyName: 'Time from...',


  description: 'Format a human-readable a JS timestamp (epoch ms) and timezone into a human-readable "time from" format (e.g. "6 minutes ago")',


  cacheable: true,


  sync: true,


  inputs: {

    toWhen: {
      friendlyName: 'To...',
      description: 'An epoch offset (in milliseconds)',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      example: 1318781876000,
      required: true
    },

    fromWhen: {
      friendlyName: 'From...',
      description: 'Another epoch offset (in milliseconds) to use as a reference when formatting the "time from" string.',
      extendedDescription: 'Defaults to current date/time',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      example: 1318781870000
    },

  },


  exits: {

    invalidToWhen: {
      friendlyName: 'invalid "to"',
      description: 'Could not build a date/time/zone from the provided "To..." timestamp.',
    },

    invalidFromWhen: {
      friendlyName: 'invalid "from"',
      description: 'Could not build a date/time/zone from the provided "From..." timestamp.',
    },

    success: {
      variableName: 'timeFromStr',
      example: '6 seconds ago',
      description: 'Done.'
    },

  },


  fn: function (inputs,exits) {
    var MomentTz = require('moment-timezone');

    // Build moment obj for `toWhen`
    var toWhenObj = MomentTz.tz(new Date(inputs.toWhen), 'Etc/Greenwich');
    if (!toWhenObj.isValid()) {
      return exits.invalidToWhen();
    }

    // Build moment obj for `fromWhen`
    // (default to current date/time if no `fromWhen` timestamp was provided)
    inputs.fromWhen = (typeof inputs.fromWhen === 'undefined') ? (new Date()).getTime() : inputs.fromWhen;
    var fromWhenObj = MomentTz.tz(new Date(inputs.fromWhen), 'Etc/Greenwich');
    if (!fromWhenObj.isValid()) {
      return exits.invalidFromWhen();
    }

    // Format final "time from" string
    var resultStr = toWhenObj.from(fromWhenObj);
    return exits.success(resultStr);
  },



};
