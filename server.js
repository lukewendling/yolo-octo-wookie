// Server
var Dispatcher = require('./lib/dispatcher');

var dispatcher = new Dispatcher();

process.on('SIGINT', function() {
  dispatcher.stop();
});

dispatcher.start();
