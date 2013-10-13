var Elevator = require('../lib/elevator');

exports.testInit = {

  setUp: function (callback) {
    Elevator.prototype._move = function() {}; // stub
    this.elevator = new Elevator({ "name": "e1", "floor": 12, "busy": false });
    callback();
  },

  'emits life events' : function (test) {
    test.done();
  }
};

exports.testRequestProcessing = {

  setUp: function (callback) {
    Elevator.prototype._move = function() {}; // stub
    this.elevator = new Elevator({ "name": "e1", "floor": 12, "busy": false });
    callback();
  },

  'accepts request' : function (test) {
    test.done();
  },

  'completes request' : function (test) {
    test.done();
  }
};