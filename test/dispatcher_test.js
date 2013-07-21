var Dispatcher = require('../lib/dispatcher');

exports.testInit = {

  setUp: function (callback) {
    this.dispatcher = new Dispatcher();
    callback();
  },

  'starts the elevator bank' : function (test) {
    test.done();
  },

  'emits life events' : function (test) {
    test.done();
  }
};

exports.testLogging = {

  setUp: function (callback) {
    this.dispatcher = new Dispatcher();
    callback();
  },

  'logs start of request' : function (test) {
    test.done();
  },

  'logs completion of request' : function (test) {
    test.done();
  }
};