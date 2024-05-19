// App.js

/*
    SETUP
*/
var db      = require('./database/db-connector');
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {

        // query1 = 'SELECT * FROM Plants;';
        // db.pool.query(query1, function(err, results, fields){
        //     // Send the results to the browser
        //     res.send(JSON.stringify(results));
        // });
        res.send("The server is running!")      // This function literally sends the string "The server is running!" to the computer
    });                                         // requesting the web site.


    app.get('/plants', (req, res) => {
        db.pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
    
            connection.query('SELECT * FROM Plants', (queryErr, results) => {
                connection.release(); // Release the connection back to the pool
    
                if (queryErr) {
                    console.error('Error executing query:', queryErr);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                res.json(results); // Send the query results as a JSON response
            });
        });
    });


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});