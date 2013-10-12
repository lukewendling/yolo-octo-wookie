'use strict';

// Client - run this file to issue some requests
var Dispatcher = require('./lib/dispatcher');

var dispatcher = new Dispatcher();

dispatcher.receive({floor: 10}, {floor: 4}, {floor: 12})
