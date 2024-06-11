// Citation for the use of the node exports module
// Date: 10 June 2024
// Adapted from the nodejs documentation. The documentation provides examples of
//  how to export functions from a module.
// Source URL: https://nodejs.org/api/modules.html#modules_modules
// Source URL: https://nodejs.org/docs/v20.13.1/api/modules.html#exports
// Source URL: https://www.geeksforgeeks.org/node-js-export-module/

// Citation for the use of the express.Router class
// Date: 10 June 2024
// Adapted from the express api documentation. See [README] for more information on the use
//  of this pattern throughout this codebase.
// Source URL: https://expressjs.com/en/4x/api.html#router

// Citation for the importing of dependencies using the require function
// Date: 10 June 2024
// Adapted from the nodejs api documentation. See [README] for more information on the use
//  of this pattern throughout this codebase.
// Source URL: https://nodejs.org/api/modules.html#requireid

// Citation for route definitions
// Date 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/app.js

const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// GET: Get all InvoiceDetails
router.get('/invoicedetails', (req, res) => {

    // select joined data from InvoiceDetails, Plants, Invoices, and Gardeners tables. Outer join Gardeners and Invoices so that ALL Invoices are returned, even if there is no matching gardenerID
    let query1 = `SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID LEFT JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;`;

    // select all plants from Plants table to show in drop down
    let query2 = `SELECT plantID, varietyName, type, price FROM Plants;`;

    // select all invoices from Invoices table and join with Gardeners on gardenerID to show in drop down
    let query3 = `SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM Invoices INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID ASC;`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);                         // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, plantIDs) {
                if (error2) {
                    console.log(error2);                // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    db.pool.query(query3, function (error3, invoiceIDs) {
                        if (error3) {
                            console.log(error3);        // if there's an error, log it to console and return a 400 status code
                            res.sendStatus(400);
                        } else {
                            // Render the invoicedetails hbs file, and send results from query1 (rows), query2 (plantIDs), and query3 (invoiceIDs)
                            res.render('invoicedetails', { data: rows, plantIDs, invoiceIDs });
                        }
                    });
                }
            });
        }
    });
});

// POST: Create a new InvoiceDetail
router.post('/add-invoicedetail-ajax', function (req, res) {
    let data = req.body;

    // Adds new input data to InvoiceDetails table
    let query1 = `INSERT INTO InvoiceDetails (plantID, invoiceID, price, quantity, lineTotal) VALUES (?, ?, ?, ?, ?);`;

    // Updates totalCost field in matching invoiceID in Invoices table
    let query2 = `UPDATE Invoices SET totalCost = totalCost + ? WHERE Invoices.invoiceID = ?;`;

    // select joined data from InvoiceDetails, Plants, Invoices, and Gardeners tables in sorted order
    let query3 = `SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.plantID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;`;

    db.pool.query(query1, [data.plantID, data.invoiceID, data.price, data.quantity, data.lineTotal], function (error, rows, fields) {
        if (error) {
            console.log("invoice details query1 error")                     // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        } else {
            db.pool.query(query2, [data.lineTotal, data.invoiceID], function (error, rows, fields) {
                if (error) {
                    console.log("invoice details query2 error");            // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    db.pool.query(query3, function (error, rows, fields) {
                        if (error) {
                            console.log("invoice details query3 error");    // if there's an error, log it to console and return a 400 status code
                            res.sendStatus(400);
                        } else {
                            res.send(rows);                                 // send the results from query3 back to the client
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;