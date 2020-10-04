/*
*
* Primary API file
*
*/

// Dependencies
var http = require('http');

// How server should response
var server = http.createServer(function(req, res) {
    res.end('Hello World\n');
});

// Start the server
server.listen(3000, function() {
    console.log('The server is listening on port 3000 now');
});