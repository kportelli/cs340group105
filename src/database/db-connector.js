// Citation for mysql.createPool
// Date: 10 June 2024
// Adapted from the nodejs-starter-app and modified to use different credentials.
// Source URL: : https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database/database/db-connector.js

// Citation for mysql database options configuration and the use of 'multipleStatements'
// Date: 10 June 2024
// Adapted from the nodejs documentation. The documentation provides examples of
//  how to configure a mysql database connection.
// Source URL: https://www.npmjs.com/package/mysql#connection-options
// Source URL: https://stackoverflow.com/questions/58410791/node-mysql-multiple-statement-queries-er-parse-error

// Citation for the use of the node exports module
// Date: 10 June 2024
// Adapted from the nodejs documentation. The documentation provides examples of
//  how to export functions from a module.
// Source URL: https://nodejs.org/api/modules.html#modules_modules
// Source URL: https://nodejs.org/docs/v20.13.1/api/modules.html#exports
// Source URL: https://www.geeksforgeeks.org/node-js-export-module/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Database connection credentials
// The api_user and api_admin are both created in the MySQL database in a 
// process that must precede the execution of the app. The idea with multiple
// databse users is to separate the permissions of the app from the permissions
// of an admin-type user. This was done in an attempt to follow the principle 
// of least privilege. The reason for the admin user is to execute all of the 
// queries in the cleanup.sql and ddl.sql files in order to reset the database.

// Pool for the api_user which does not allow for multiple SQL statements. 
// This is used for all CRUD queries.
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'api_user',
    password        : ';0JBY)}kXx"un}O0',
    database        : 'goc_dev'
});

// Pool for the api_admin which allows for multiple SQL statements.
// This is used for the "/db-management-reset" route which executes all queries from the cleanup.sql and ddl.sql files
// in order to drop all tables, recreate them, and then seed them with data.
var adminpool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'api_admin',
    password        : ';0JBY)}kXx"un}O0',
    database        : 'goc_dev',
    multipleStatements: true
});

// Function to check connection and make a SELECT query
const testConnection = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
    });
};

// Test the connection and query
testConnection();

// Export both pool and admin pool
module.exports = {
    pool: pool,
    adminpool: adminpool
};