module.exports = {


  friendlyName: 'Time from...',


  description: 'Format a human-readable a JS timestamp (epoch ms) and timezone into a human-readable "time from" format (e.g. "6 minutes ago")',


  cacheable: true,


  sync: true,


  inputs: {

    timestamp: {
      friendlyName: 'Timestamp',
      description: 'An epoch offset (in milliseconds)',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000,
      required: true
    },

    fromWhen: {
      friendlyName: 'From...',
      description: 'Another epoch offset (in milliseconds) to use as a reference when formatting the "time from" string.',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      example: 1318781870000,
      required: true
    },

  },


  exits: {

    success: {
      variableName: 'timeAgo',
      example: '6 seconds ago',
      description: 'Done.'
    },

  },


  fn: function (inputs,exits) {
    return exits.success();
  },



};
