var ElevatorBank = require('../lib/elevator_bank');

exports.testInit = {

  setUp: function (callback) {
    this.elevator_bank = new ElevatorBank([{ "name": "e1", "floor": 12, "busy": false }]);
    callback();
  },

  'configures elevators' : function (test) {
    test.done();
  },

  'starts elevators' : function (test) {
    test.done();
  },

  'emits life events' : function (test) {
    test.done();
  }
};

exports.testRequestProcessing = {

  setUp: function (callback) {
    this.elevator_bank = new ElevatorBank([{ "name": "e1", "floor": 12, "busy": false }]);
    callback();
  },

  'forwards request to elevator' : function (test) {
    test.done();
  },

  'manages a request queue' : function (test) {
    test.done();
  }
};