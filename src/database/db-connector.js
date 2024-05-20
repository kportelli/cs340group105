// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// // Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_[your_onid]',
//     password        : '[your_db_password]',
//     database        : 'cs340_[your_onid]'
// })

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'api_user',
    password        : ';0JBY)}kXx"un}O0',
    database        : 'goc_dev'
})

// Function to check connection and make a SELECT query
const testConnection = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');

        // Make a basic SELECT query
        connection.query('SELECT * FROM Plants', (queryErr, results, fields) => {
            connection.release(); // Release the connection back to the pool

            if (queryErr) {
                console.error('Error executing query:', queryErr);
                return;
            }

            console.log('Query results:', results);
        });
    });
};

// Test the connection and query
testConnection();

// Export it for use in our applicaiton
module.exports.pool = pool;