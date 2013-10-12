'use strict';

var events = require('events'),
  util = require('util');

module.exports = Elevator;

// Elevator is an event emitter
util.inherits(Elevator, events.EventEmitter);

/*
  The worker bee
  obj - name, floor attributes
*/
function Elevator(obj) {
  this.name = obj.name;
  this.floor = obj.floor || 1;
  this.move({floor: 1});
  events.EventEmitter.call(this);

  this.idle = function() {
    this.emit('idle', this);
  }
}

/*
  Move to requested floor
*/
Elevator.prototype.move = function(req) {
  if (this.floor == req.floor) {
    console.log(this.name + ' is on ' + this.floor);
    return;
  }
  this.busy = true;
  var self = this;
  setTimeout(function() {
    console.log(self.name + ' moved from ' + self.floor + ' to ' + req.floor);
    self.floor = req.floor;
    self.busy = false;
    console.log(self.name + ' is now on floor ' + self.floor);
    self.idle(); // signal that i'm done
  }, (Math.abs((self.floor || 1) - req.floor) * 1000));
};
