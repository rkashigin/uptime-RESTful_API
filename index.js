/*
*
* Primary API file
*
*/

// Dependencies
var http = require('http');
const { type } = require('os');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// How server should response
var server = http.createServer(function(req, res) {
    
    // Get the URL and parse it
    var parsedURL = url.parse(req.url, true);
    
    // Get the path
    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    var queryStringObject = parsedURL.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function() {
        buffer += decoder.end();

        // Choose the hadler this request should go to
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route the request to the specified handler
        chosenHandler(data, function(statusCode, payload) {
            // Use the status code or defauld to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Use the payload of default to an empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Returning the response
            console.log('Returning this response: ', statusCode, payloadString);
        });

    });
    
});

// Start the server
server.listen(3000, function() {
    console.log('The server is listening on port 3000 now');
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
    // Callback a HTTP status code and a payload object
    callback(406, {'name' : 'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
};

// Define a request router
var router = {
    'sample' : handlers.sample 
};