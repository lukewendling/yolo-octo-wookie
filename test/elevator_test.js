var Elevator = require('../lib/elevator');

exports.testConstructor = {

  setUp: function (callback) {
    this.elevator = new Elevator({ name: "e1", floor: 12, warmUp: false });
    callback();
  },

  'sets properties' : function (test) {
    test.equal(12, this.elevator.floor);
    test.equal("e1", this.elevator.name);
    test.equal(false, this.elevator.busy);
    test.done();
  }
};

exports.testMoving = {

  setUp: function (callback) {
    this.elevator = new Elevator({ name: "e1", floor: 12, warmUp: false });
    callback();
  },

  'busy when job starts' : function (test) {
    this.elevator.busy = false;
    this.elevator._run = function() {};
    this.elevator._startMoving({floor: 10});
    test.equal(true, this.elevator.busy);
    test.done();
  },

  'not busy when job ends' : function (test) {
    this.elevator.busy = true;
    this.elevator._doneMoving({floor: 10});
    test.equal(false, this.elevator.busy);
    test.done();
  }
};