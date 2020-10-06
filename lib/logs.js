/*
*
* Library for storing and rotating logs
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

// Container for the module
var lib = {};

// Export the module
module.exports = lib;