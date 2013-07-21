var events = require('events');

function Elevator() {
  this.busy = false;
  events.EventEmitter.call(this);
  this.done = function() {
    this.emit('done');
  }
}

Elevator.prototype = Object.create(events.EventEmitter.prototype);

Elevator.prototype.accept = function(req) {
  
};

Elevator.prototype.moveTo = function(req) {
  
};

module.exports = Elevator;