/*
*
* Primary API file
*
*/

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var _data = require('./lib/data');

// TESTING
// @TODO delete this
_data.read('test', 'newFile1', function(err, data) {
    console.log('There is an error occured: ', err, 'and this was the data: ', data);
});

// Instantiate the HTTP server
var httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);
});

// Start the HTTP server
httpServer.listen(config.httpPort, function() {
    console.log('The server is listening on ' + config.httpPort);
});

// Instantiate the HTTPS server
var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
    unifiedServer(req, res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
    console.log('The server is listening on ' + config.httpsPort);
});

// All the server logic for http and https
var unifiedServer = function(req, res) {
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
};

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

// Define a request router
var router = {
    'ping' : handlers.ping 
};