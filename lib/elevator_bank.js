var events = require('events');
var Elevator = require('./elevator')

function ElevatorBank() {
  this.requests = [];
  this.elevators = [new Elevator(), new Elevator()];

  events.EventEmitter.call(this);
  this.requestComplete = function() {
    this.emit('requestComplete');
  }
}

ElevatorBank.prototype = Object.create(events.EventEmitter.prototype);

ElevatorBank.prototype.start = function() {

};

ElevatorBank.prototype.enqueue = function(req) {

};

ElevatorBank.prototype.forward = function(req) {
  
};

ElevatorBank.prototype.next = function() {
  
};

module.exports = ElevatorBank;