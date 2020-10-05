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

// Parse a JSON string to an object in all cases
utils.parseJsonToObject = function(str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch(e) {
        return {};
    }
};

// Export utils
module.exports = utils;