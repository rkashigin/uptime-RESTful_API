/*
*
* Utils for various tasks
*
*/

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');

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

// Send an SMS message via Twilio
utils.sendTwilioSms = function(phone, msg, callback) {
    // Validate parametres
    phone = typeof(phone) === 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg : false;

    if (phone && msg) {
        // Comfigure the request payload
        var payload = {
            'From' : config.twilio.fromPhone,
            'To' : '+7' + phone,
            'Body' : msg
        };

        // Stringidy the payload
        var stringPayload = querystring.stringify(payload);

        // Configure the request details
        var requestDetails = {
            'protocol' : 'https:',
            'hostname' : 'api.twilio.com',
            'method' : 'POST',
            'path' : '/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json',
            'auth' : config.twilio.accountSid + ':' + config.twilio.authToken,
            'headers' : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length' : Buffer.byteLength(stringPayload)
            }
        };

        // Instantiate the request object
        var req = https.request(requestDetails, function(res) {
            // Grab the status of the sent request
            var status = res.statusCode;
            // Callback successfully if the request went through
            if (status === 200 || status === 201) {
                callback(false);
            } else {
                callback('Status code returned was: ' + status);
            }
        });

        // Bind to the error event so id doesn't get thrown
        req.on('error', function(e) {
            callback(e);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();
    } else {
        callback('Given parametres were missing or invalid');
    }
};

// Export utils
module.exports = utils;