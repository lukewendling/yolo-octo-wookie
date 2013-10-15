/*
  Use Closure compiler REST API
*/
var gcc = require('gcc-rest');
gcc.addDir('./lib');
gcc.replace(/'use strict';/g, '');
gcc.header('// Compiled using Google Closure Compiler via gcc-rest\n');
gcc.output('./build/compiled.js');