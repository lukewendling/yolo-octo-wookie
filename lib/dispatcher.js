'use strict';

var ElevatorBank = require('./elevator_bank'),
  net = require('net'),
  util = require('util'),
  jsonfile = require('jsonfile'),
  JsonSocket = require('json-socket');

module.exports = Dispatcher;

var ELRC = './elevators.json'

/*
  The request processing server:
  Dispatches requests to elevator bank
*/
function Dispatcher() {
  this.requestLog = [];
  this.elevatorBank;

  this.config = {
    port: 8000,
    host: '127.0.0.1'
  };
}

/*
  Start the request processing server
*/
Dispatcher.prototype.start = function() {
  var server = net.createServer();
  var self = this;
  var elevators = jsonfile.readFileSync(ELRC);
  this.elevatorBank = new ElevatorBank(elevators);
  this.elevatorBank.on('processed', function onReqProcessed(req) {
    self.complete(req);
    console.log('Handling request for: ' + util.inspect(req))
  });
  server.listen(this.config.port);
  console.log('Dispatcher started...')
  server.on('connection', function onSocketConnection(socket) {
    socket = new JsonSocket(socket);
    socket.on('message', function(req) {
      self.log(req);
      self.forward(req);
      socket.sendEndMessage({result: 'request sent'});
    });
  });
};

/*
  Accept requests from clients
*/
Dispatcher.prototype.receive = function(requests) {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(req) {
    JsonSocket.sendSingleMessageAndReceive(self.config.port, self.config.host, req, function(err, message) {
      if (err) {
        console.log(util.inspect(err));
      } else {
        console.log(message.result);
      }
    });
  });
};

/*
  Log incoming requests
*/
Dispatcher.prototype.log = function(req) {
  this.requestLog.push(req);
};

/*
  Forward requests to elevator bank
*/
Dispatcher.prototype.forward = function(req) {
  this.log(req);
  this.elevatorBank.receive(req);
};

/*
  Mark request complete
*/
Dispatcher.prototype.complete = function(req) {
  //TODO: mark request complete
};

/* 
  graceful stop: save elevator state for next run
*/
Dispatcher.prototype.stop = function() {
  var elevators = this.elevatorBank.elevators;
  jsonfile.writeFileSync(ELRC, elevators);
  console.log('Dispatcher stopped');
  process.exit();
};
