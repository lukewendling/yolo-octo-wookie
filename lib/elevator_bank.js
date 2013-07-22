var events = require('events'),
  Elevator = require('./elevator'),
  util = require('util');

/*
  Manages a queue of elevator requests and elevator states
*/
function ElevatorBank() {
  this.requests = [];
  this.elevators = [new Elevator({name: 'e1'}), new Elevator({name: 'e2'})];
  this.elevators.forEach(function(elevator) {
    var self = this;
    elevator.on('idle', function onElevatorIdle(el) {
      self.forward(el);
    });
  }, this);

  events.EventEmitter.call(this);
}

util.inherits(ElevatorBank, events.EventEmitter);

/*
  Returns idle elevators
*/
ElevatorBank.prototype.idleElevators = function() {
  return this.elevators.filter(function(el) {return !el.busy});
};

/*
  Receive and queue a new request
*/
ElevatorBank.prototype.receive = function(req) {
  this.enqueue(req);
  var nextElevator = this.idleElevators()[0];
  if (nextElevator !== undefined) {
    this.forward(nextElevator);
  }
};

ElevatorBank.prototype.enqueue = function(req) {
  this.requests.push(req);
};

/*
  Trigger elevator to handle a request
*/
ElevatorBank.prototype.forward = function(elevator) {
  var nextReq = this.next();
  if (nextReq != 0) {
    elevator.move(nextReq);
    this.emit('processed', nextReq);
  }
};

/*
  Return next in queue (FIFO)
*/
ElevatorBank.prototype.next = function() {
  if (this.requests.length > 0) {
    return this.requests.shift();
  }
  else {
    return 0;
  }
};

module.exports = ElevatorBank;