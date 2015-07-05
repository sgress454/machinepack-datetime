module.exports = {


  friendlyName: 'Now',


  description: 'Construct a new JS timestamp from the current time.',


  sync: true,


  inputs: {


  },


  exits: {

    success: {
      description: 'Returns the current time as a JS timestamp (an epoch offset in milliseconds)',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000,
    }

  },


  fn: function (inputs,exits) {

    return exits.success((new Date()).getTime());
  }


};
