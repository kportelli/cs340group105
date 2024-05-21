// App.js

/*
    SETUP
*/
var db      = require('./database/db-connector');

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
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

app.post('/add-plant-ajax', function(req, res){

    let data = req.body;
    console.log(data);

    // capture NULL values
    let price = parseFloat(data.price);
    if (isNaN(price)){
        price = 'NULL';
    }

    query1 = `INSERT INTO plants (varietyName, type, price) VALUES ('${data.varietyName}', '${data.type}', ${price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Plants;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


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




// PAGES
app.get('/pages-index', (req, res) => {
    res.render('index');
});

app.get('/pages-gardens', (req, res) => {
    res.render('gardens');
});

app.get('/pages-plots', (req, res) => {
    res.render('plots');
});

app.get('/pages-plantsplots', (req, res) => {
    res.render('plantsplots');
});

app.get('/pages-gardenersplots', (req, res) => {
    res.render('gardenersplots');
});

app.get('/pages-gardeners', (req, res) => {
    res.render('gardeners');
});

app.get('/pages-invoicedetails', (req, res) => {
    res.render('invoicedetails');
});

app.get('/pages-invoices', (req, res) => {
    res.render('invoices');
});

app.get('/pages-plants', (req, res) => {
    let query1 = "SELECT * FROM Plants;";               // Define our query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('plants', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });
    // res.render('plants');
});




/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});