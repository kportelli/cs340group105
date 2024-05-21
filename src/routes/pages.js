const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/gardens', (req, res) => {
    res.render('gardens');
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
    let query1 = "SELECT * FROM Plants;";                       // Define the query
    db.pool.query(query1, function(error, rows, fields){        // Execute the query
        res.render('plants', {data: rows});                     // Render the hbs file, and also send the renderer
    });
});

module.exports = router;