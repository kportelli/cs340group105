const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// CREATE/INSERT/POST

router.post('/add-invoicedetail-ajax', function (req, res) {
    let data = req.body;
    let query1 = `INSERT INTO InvoiceDetails (plantID, invoiceID, price, quantity, lineTotal) VALUES ('${data.plantID}', '${data.invoiceID}', '${data.price}', '${data.quantity}', '${data.lineTotal}')`;
    let query2 = "SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;";

    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// DELETE
router.delete('/delete-invoicedetail-ajax/', function (req, res, next) {
    let data = req.body;
    let invoiceDetailID = parseInt(data.invoiceDetailID);

    // query to delete an invoiceDetail by invoiceDetailID from InvoiceDetails table
    let deleteFromInvoiceDetails = `DELETE FROM InvoiceDetails WHERE invoiceDetailID = ?`;

    db.pool.query(deleteFromInvoiceDetails, [invoiceDetailID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            //  Since we are just deleting 1 row and don't need to send back any new data,
            // we will send back a status of 204 (No Content) common for PUT or DELETE.
            res.sendStatus(204);
        }
    });
});

module.exports = router;