'use strict';

var events = require('events'),
  util = require('util');

module.exports = Elevator;

// Elevator is an event emitter
util.inherits(Elevator, events.EventEmitter);

/*
  The worker bee
  obj - name, floor attributes
  optional 'warmUp' prop moves to floor 1
*/
function Elevator(obj) {
  this.name = obj.name;
  this.floor = obj.floor || 1;
  this.busy = false;
  if (obj.warmUp) {
    this.handleRequest({floor: 1});
  }
  events.EventEmitter.call(this);

  this.idle = function() {
    this.emit('idle', this);
  };
}

/*
  Handle move request, prep to move
*/
Elevator.prototype.handleRequest = function(req) {
  if (this.noWait(req)) {
    console.log(this.name + ' is on ' + this.floor);
    return;
  }
  this._startMoving(req);
};

/*
  If on requested floor already
*/
Elevator.prototype.noWait = function(req) {
  return this.floor === req.floor;
};

/*
  Start job
*/
Elevator.prototype._startMoving = function(req) {
  this.busy = true;
  console.log(this.name + ' is moving from ' + this.floor + ' to ' + req.floor);
  this._run(req);
};

/*
  Mechanism for moving
*/
Elevator.prototype._run = function(req) {
  var self = this;
  setTimeout(function() {
    self._doneMoving(req);
  }, (Math.abs((self.floor || 1) - req.floor) * 1000));
};

/*
  Stop job
*/
Elevator.prototype._doneMoving = function(req) {
  this.floor = req.floor;
  this.busy = false;
  console.log(this.name + ' is now on floor ' + this.floor);
  this.idle(); // signal that i'm done
};
