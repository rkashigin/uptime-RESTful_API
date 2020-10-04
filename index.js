/*
*
* Primary API file
*
*/

// Dependencies
var http = require('http');
var url = require('url');

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

    // Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request received with these headers: ', headers);
    
});

// Start the server
server.listen(3000, function() {
    console.log('The server is listening on port 3000 now');
});