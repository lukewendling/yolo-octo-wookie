var events = require('events');
var ElevatorBank = require('./elevator_bank')

function Dispatcher() {
  this.log = [];
  this.elevatorBank = new ElevatorBank();
  // this.elevatorBank.on('requestComplete', this.complete(req));
  
  events.EventEmitter.call(this);
  this.run = function() {
    this.emit('run');
  } 
}

Dispatcher.prototype = Object.create(events.EventEmitter.prototype);

Dispatcher.prototype.start = function() {
  this.ElevatorBank.start();
};

Dispatcher.prototype.log = function(req) {
  
};

Dispatcher.prototype.forward = function(req) {
  
};

Dispatcher.prototype.complete = function(req) {
  
};

module.exports = Dispatcher;