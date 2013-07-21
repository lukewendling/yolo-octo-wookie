var Elevator = require('../lib/elevator');

exports.testInit = {

  setUp: function (callback) {
    this.elevator = new Elevator();
    callback();
  },

  'emits life events' : function (test) {
    test.done();
  }
};

exports.testRequestProcessing = {

  setUp: function (callback) {
    this.elevator = new Elevator();
    callback();
  },

  'accepts request' : function (test) {
    test.done();
  },

  'completes request' : function (test) {
    test.done();
  }
};