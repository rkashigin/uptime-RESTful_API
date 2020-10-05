/*
*
* Request handlers
*
*/

// Dependencies

// Define the handlers
var handlers = {};

// Ping handler
handlers.ping = function(data, callback) {
    callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
};

// Export the module
module.exports = handlers;