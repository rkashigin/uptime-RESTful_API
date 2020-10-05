/*
*
* Library for storing data
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');
var utils = require('./utils');

// Container for the module
var lib = {};

// Base direectory of the data folder
lib.baseDir = path.join(__dirname, './../.data/');

// Write data to a file
lib.create = function(dir, filename, data, callback) {
    // Open file for writing
    fs.open(lib.baseDir + dir + '/' + filename + '.json', 'wx', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Convert data to a string
            var stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if (!err) {
                    fs.close(fileDescriptor, function(err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};

// Read data from a file
lib.read = function(dir, filename, callback) {
    fs.readFile(lib.baseDir + dir + '/' + filename + '.json', 'utf8', function(err, data) {
        if (!err && data) {
            var parsedData = utils.parseJsonToObject(data);
            callback(false, parsedData);
        } else {
            callback(err, data);
        }
    });  
};

// Update data inside a file
lib.update = function(dir, filename, data, callback) {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + filename + '.json', 'r+', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Convert data to a string
            var stringData = JSON.stringify(data);

            // Truncate the file
            fs.ftruncate(fileDescriptor, function(err) {
                if (!err) {
                    // Write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, function(err) {
                        if (!err) {
                            fs.close(fileDescriptor, function(err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    });
};

// Delete a file
lib.delete = function(dir, filename, callback) {
    // Unlink the file
    fs.unlink(lib.baseDir + dir + '/' + filename + '.json', function(err) {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};

// Export the module
module.exports = lib;