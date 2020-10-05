/*
*
* Utils for various tasks
*
*/

// Dependencies
var crypto = require('crypto');
var config = require('./config');

// Container for all the utils
var utils = {};

// Create a SHA256 hash
utils.hash = function(str) {
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

// Create a string of random alphanumeric characters, of a given length
utils.createRandomString = function(strLength) {
    strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;

    if (strLength) {
        // Define all the possible characters
        var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        // Start the final string
        var str = '';

        for (var i = 0; i < strLength; i++) {
            // Get a random character from a possible characters string
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            // Appent the character to a final string
            str += randomCharacter;
        }

        // Return the final string
        return str;
    } else {
        return false;
    }
};

// Export utils
module.exports = utils;