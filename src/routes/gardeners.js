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
const db = require('../database/db-connector');

// GET: Get all Gardeners
router.get('/gardeners', (req, res) => {
    let query1 = "SELECT * FROM Gardeners;";
    db.pool.query(query1, function (error, rows, fields) {
        
        // render the gardeners view with the data returned
        res.render('gardeners', { data: rows });
    });
});

// POST: Create a new Gardener
router.post('/add-gardener-ajax', function (req, res) {
    let data = req.body;

    // Insert a new Gardener into the Gardeners table
    query1 = `INSERT INTO Gardeners (firstName, lastName, streetAddress, city, zip, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    // Select the newly created Gardener
    query2 = `SELECT * FROM Gardeners ORDER BY gardenerID DESC LIMIT 1;`;

    db.pool.query(query1, [data.firstName, data.lastName, data.streetAddress, data.city, data.zip, data.email, data.phone], function (error, rows, fields) {
        if (error) {
            console.log(error)              // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);     // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);         // Send the newly created Gardener back to client
                }
            });
        }
    });
});

// PUT: Update an existing Gardener
router.put('/put-gardener-ajax', function (req, res, next) {
    let data = req.body;
    
    let gardenerID = parseInt(data.gardenerID);
    let gardenerfirstName = data.firstName;
    let gardenerlastName = data.lastName;
    let streetAddress = data.streetAddress;
    let city = data.city;
    let zip = data.zip;
    let phone = data.phone;
    let email = data.email;

    // if gardenerID is not a number, send a 400 status code
    if (isNaN(gardenerID)) {
        res.sendStatus(400);
        console.log("gardenerID is not a number");
        return;
    }

    // Update the Gardener whose gardenerID matches the one provided
    let queryUpdateGardener = `UPDATE Gardeners SET firstName = ?, lastName = ?, streetAddress = ?, city = ?, zip = ?, phone = ?, email = ? WHERE gardenerID = ?`;

    // Select the updated Gardener
    let selectUpdatedGardener = `SELECT * FROM Gardeners WHERE gardenerID = ?`

    db.pool.query(queryUpdateGardener, [gardenerfirstName, gardenerlastName, streetAddress, city, zip, phone, email, gardenerID], function (error, rows, fields) {
        if (error) {
            console.log(error);             // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectUpdatedGardener, [gardenerID], function (error, rows, fields) {
                if (error) {
                    console.log(error);     // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    res.send(rows);         // send the updated Gardener back to client
                }
            });
        }
    });
});

// DELETE: Delete a Gardener
router.delete('/delete-gardener-ajax/', function (req, res, next) {
    let data = req.body;
    let gardenerID = parseInt(data.id);
    let deleteGardener = `DELETE FROM Gardeners WHERE gardenerID = ?`;

    // note: when a gardenerID is deleted, 
    // referencing Invoice rows set gardenerID to NULL;
    // referencing PlotsGardeners rows are also deleted via CASCADE

    db.pool.query(deleteGardener, [gardenerID], function (error, rows, fields) {
        if (error) {
            console.log(error);         // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);        // send a 204 status code to indicate that the entity was successfully deleted
        }
    });
});

module.exports = router;