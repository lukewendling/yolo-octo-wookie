var events = require('events'),
  util = require('util');

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

util.inherits(Elevator, events.EventEmitter);

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
    self.idle();
  }, (Math.abs((self.floor || 1) - req.floor) * 1000));
};

module.exports = Elevator;