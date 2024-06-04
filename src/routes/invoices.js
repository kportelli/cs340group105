const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');


// DISPLAY/READ/GET

router.get('/invoices', (req, res) => {
    let query1 = "SELECT * FROM Invoices;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('invoices', { data: rows });

    })
});
