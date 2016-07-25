module.exports = {


  friendlyName: 'Now',


  description: 'Construct a new timestamp from the current time.',


  sync: true,


  inputs: {


  },


  exits: {

    success: {
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      outputExample: 1318781876000,
      outputFriendlyName: 'Current timestamp',
      outputDescription: 'A Javascript timestamp representing the current time.'
    }

  },


  fn: function (inputs,exits) {

    return exits.success((new Date()).getTime());
  }


};
