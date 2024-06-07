const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');


// DISPLAY/READ/GET

router.get('/invoices', (req, res) => {
    // Select all Invoices and join with Gardener table on gardenerID
    let query1 = "SELECT * FROM Invoices JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID;";

    // Select relevant Gardener values for dropdown menu to display names with PKs
    let query2 = "SELECT gardenerID, firstName, lastName FROM Gardeners;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, gardenerIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    res.render('invoices', { data: rows, gardenerIDs });
                }
            });
        }
    });
});


// INSERT/CREATE/POST
router.post('/add-invoice-ajax', function (req, res) {
    let data = req.body;

    // Insert a new Invoice with gardenerID and starting totalCost of $0.00
    let query1 = `INSERT INTO Invoices (gardenerID, totalCost) VALUES ('${data.gardenerID}', '${data.totalCost}');`;

    // Select relevant data to dynamically display table with new Invoice added 
    let query2 = "SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName, Invoices.totalCost FROM Invoices JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID DESC LIMIT 1;";
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error2, rows, fields2) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

module.exports = router;