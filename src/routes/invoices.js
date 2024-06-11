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

// GET: Get all Invoices
router.get('/invoices', (req, res) => {
    
    // select all Invoices gardeners by joining Invoices and Gardeners on gardenerID. Outer join Gardeners and Invoices so that ALL Invoices are returned, even if there is no matching gardenerID
    let query1 = `SELECT * FROM Invoices LEFT JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID;`;

    // Select relevant Gardener columns for dropdown menu to display names with PKs
    let query2 = `SELECT gardenerID, firstName, lastName FROM Gardeners;`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);             // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, gardenerIDs) {
                if (error2) {
                    console.log(error2);    // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    // Render the invoices hbs file, and send results from query1 (rows) and results from query2 (gardenerIDs)
                    res.render('invoices', { data: rows, gardenerIDs });
                }
            });
        }
    });
});

// POST: Create a new Invoice
router.post('/add-invoice-ajax', function (req, res) {
    let data = req.body;

    // Insert a new Invoice into the Invoices table
    let query1 = `INSERT INTO Invoices (gardenerID, totalCost) VALUES (?, ?);`;

    // Select the last row from the Invoices table joined with Gardeners on gardenerID
    let query2 = `SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName, Invoices.totalCost FROM Invoices JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID DESC LIMIT 1;`;
    
    db.pool.query(query1, [data.gardenerID, data.totalCost], function (error, rows, fields) {
        if (error) {
            console.log(error)              // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error2, rows, fields2) {
                if (error2) {
                    console.log(error2);    // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    res.send(rows);         // Send the newly created Invoice back to client
                }
            });
        }
    });
});

module.exports = router;