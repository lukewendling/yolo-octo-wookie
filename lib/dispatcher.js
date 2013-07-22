var ElevatorBank = require('./elevator_bank'),
  net = require('net'),
  util = require('util'),
  JsonSocket = require('json-socket');

function Dispatcher() {
  this.requestLog = [];
  this.elevatorBank;

  this.config = {
    port: 8000,
    host: '127.0.0.1'
  };
}

Dispatcher.prototype.start = function() {
  var server = net.createServer();
  this.elevatorBank = new ElevatorBank();
  this.elevatorBank.on('processed', function onReqProcessed(req) {
    console.log('Processed: ' + util.inspect(req))
  });
  server.listen(this.config.port);
  var self = this;
  server.on('connection', function onSocketConnection(socket) {
    socket = new JsonSocket(socket);
    socket.on('message', function(req) {
      self.forward(req);
      socket.sendEndMessage({result: 'ok'});
    });
  });
};

Dispatcher.prototype.receive = function(requests) {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(req) {
    JsonSocket.sendSingleMessageAndReceive(self.config.port, self.config.host, req, function(err, message) {
      if (err) {
        console.log(util.inspect(err));
      }
      else {
        console.log(message.result);
      }
    });
  });
};

Dispatcher.prototype.log = function(req) {
  this.requestLog.push(req);
};

Dispatcher.prototype.forward = function(req) {
  this.log(req);
  this.elevatorBank.receive(req);
};

Dispatcher.prototype.complete = function(req) {
  
};

module.exports = Dispatcher;