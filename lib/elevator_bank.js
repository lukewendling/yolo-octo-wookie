'use strict';

var events = require('events'),
  Elevator = require('./elevator'),
  util = require('util');

module.exports = ElevatorBank;

// ElevatorBank is an event emitter
util.inherits(ElevatorBank, events.EventEmitter);

/*
  Manages a queue of elevator requests and elevator states
  elevators - an array of elevator objects
*/
function ElevatorBank(elevators) {
  this.requests = [];
  this.elevators = elevators.map(function(obj) {
    return new Elevator(obj);
  });
  this.elevators.forEach(function(elevator) {
    var self = this;
    elevator.on('idle', function onElevatorIdle(el) {
      self.forward(el);
    });
  }, this);

  events.EventEmitter.call(this);
}

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
    elevator.handleRequest(nextReq);
    this.emit('processed', nextReq);
  }
};

/*
  Return next in queue (FIFO)
*/
ElevatorBank.prototype.next = function() {
  if (this.requests.length > 0) {
    return this.requests.shift();
  } else {
    return 0;
  }
};
