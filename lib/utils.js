/*
*
* Utils for various tasks
*
*/

// Dependencies
var crypto = require('crypto');
var config = require('../config');

// Container for all the utils
var utils = {};

// Create a SHA256 hash
helpers.hash = function(str) {
    if (typeof(str) === 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Export utils
module.exports = utils;