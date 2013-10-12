// Server
var Dispatcher = require('./lib/dispatcher');

var dispatcher = new Dispatcher();

// handle Ctl-C and gracefully stop
process.on('SIGINT', function() {
  dispatcher.stop();
});

dispatcher.start();
