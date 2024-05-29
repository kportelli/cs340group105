const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/gardens', (req, res) => {
    let query1 = "SELECT gardenID AS ID, gardenName AS Name, streetAddress AS Address, city AS City, zip AS Zip FROM Gardens;";
    db.pool.query(query1, function(error, rows, fields){        // Execute the query
        res.render('gardens', {data: rows});                     // Render the hbs file, and also send the renderer
    });
});

router.get('/plots', (req, res) => {
    res.render('plots');
});

router.get('/plantsplots', (req, res) => {
    res.render('plantsplots');
});

router.get('/gardenersplots', (req, res) => {
    res.render('gardenersplots');
});

router.get('/gardeners', (req, res) => {
    res.render('gardeners');
});

router.get('/invoicedetails', (req, res) => {
    res.render('invoicedetails');
});

router.get('/invoices', (req, res) => {
    res.render('invoices');
});

router.get('/plants', (req, res) => {
    let query1 = 'SELECT plantID AS "Id", varietyName AS "Variety", type AS "Type", price AS "Price" FROM Plants;';                       // Define the query
    db.pool.query(query1, function(error, rows, fields){        // Execute the query
        res.render('plants', {data: rows});                     // Render the hbs file, and also send the renderer
    });
});

module.exports = router;