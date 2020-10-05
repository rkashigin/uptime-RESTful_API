/*
*
* Create and export configuration variables
*
*/

// Container for all the environments
var environments = {};

// Staging {default} environment
environments.staging = {
    'httpPort' : 4000,
    'httpsPort' : 4001,
    'envName' : 'staging',
    'hashingSecret' : 'thisIsASecret',
    'maxChecks': 5,
    'twilio' : {
        'accountSid' : 'ACf67800c45e8cf545d57d37e1a3dc65f5',
        'authToken' : '232bfd857411c18d54035716be59a995',
        'fromPhone' : '+16592005204'
    }
};

// Production environment
environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production',
    'hashingSecret' : 'thisIsASecret',
    'maxChecks': 5,
    'twilio' : {
        'accountSid' : 'ACf67800c45e8cf545d57d37e1a3dc65f5',
        'authToken' : '232bfd857411c18d54035716be59a995',
        'fromPhone' : '+16592005204'
    }
};

// Determine which environment was passed as a CLI arg
var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the passed environment exists otherwise use default
var environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;