var events = require('events');

function Elevator() {
  this.queue = [];
  this.busy = false;
  events.EventEmitter.call(this);
  this.done = function() {
    this.emit('done');
  }
}

Elevator.prototype = Object.create(events.EventEmitter.prototype);

Elevator.prototype.enqueue = function(req) {
  
};

Elevator.prototype.accept = function(req) {
  
};

Elevator.prototype.moveTo = function(req) {
  
};

Elevator.prototype.next = function() {
  
};

module.exports = Elevator;