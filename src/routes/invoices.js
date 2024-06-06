const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// DISPLAY/READ/GET

router.get('/invoices', (req, res) => {
    // Select all records from Invoices
    let query1 = "SELECT * FROM Invoices;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('invoices', { data: rows });
        }
    });
});




module.exports = router;