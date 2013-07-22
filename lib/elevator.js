var events = require('events'),
  util = require('util');

/*
  The worker bee
*/
function Elevator(options) {
  this.name = options.name;
  this.move({floor: 1});
  events.EventEmitter.call(this);

  this.idle = function() {
    this.emit('idle', this);
  }
}

util.inherits(Elevator, events.EventEmitter);

/*
  Move to requested floor
*/
Elevator.prototype.move = function(req) {
  this.busy = true;
  var self = this;
  setTimeout(function() {
    console.log(self.name + ' moved to ' + util.inspect(req));
    self.floor = req.floor;
    self.busy = false;
    self.idle();
  }, (Math.abs((self.floor || 1) - req.floor) * 1000));
};

module.exports = Elevator;