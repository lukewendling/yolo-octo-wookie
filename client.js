// Client
var Dispatcher = require('./lib/dispatcher');

dispatcher = new Dispatcher();

dispatcher.receive({floor: 10}, {floor: 4}, {floor: 12})
