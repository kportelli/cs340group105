// App.js

/*
    SETUP
*/
var db      = require('./database/db-connector');

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
// app.js

app.get('/', function(req, res)
{
    let query1 = "SELECT * FROM Plants;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });
    // connection.query('SELECT * FROM Plants', (queryErr, results) => {
    //     connection.release(); // Release the connection back to the pool

    //     if (queryErr) {
    //         console.error('Error executing query:', queryErr);
    //         res.status(500).send('Internal Server Error');
    //         return;
    //     }
    //     res.render('index', {data: results});   
    //     // res.json(results); // Send the query results as a JSON response
    // });             
});                                         // will process this file, before sending the finished HTML to the client.                                      // requesting the web site.


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