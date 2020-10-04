/*
*
* Create and export configuration variables
*
*/

// Container for all the environments
var environments = {};

// Staging {default} environment
environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
};

// Production environment
environments.production = {
    'port' : 5000,
    'envName' : 'production'
};

// Determine which environment was passed as a CLI arg
var currentEnvironment = typeof(process.send.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the passed environment exists otherwise use default
var environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;