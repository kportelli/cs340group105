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

// GET: Get all Gardens
router.get('/gardens', (req, res) => {

    // select all Gardeners from the Gardeners table
    let query1 = `SELECT gardenID AS ID, gardenName AS Name, streetAddress AS Address, city AS City, zip AS Zip FROM Gardens;`;

    // select all gardenIDs and gardenNames from the Gardens table
    let query2 = `SELECT gardenID, gardenName FROM Gardens;`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);             // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, gardenIDs) {
                if (error2) {
                    console.log(error2);    // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    // Render the hbs file, and send results from query1 (rows) and results from query2 (gardenIDs)
                    res.render('gardens', { data: rows, gardenIDs });
                }
            });
        }
    });
});

// POST: Create a new Garden
router.post('/add-garden-ajax', function (req, res) {
    let data = req.body;
    
    // Insert a new Garden into the Gardens table
    query1 = `INSERT INTO Gardens (gardenName, streetAddress, city, zip) VALUES (?, ?, ?, ?);`;

    // Select all Gardens from the Gardens table
    query2 = `SELECT * FROM Gardens;`;

    db.pool.query(query1, [data.name, data.address, data.city, data.zip], function (error, rows, fields) {
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
                    res.send(rows);        // send the results from query2 (all gardens) back to the client
                }
            });
        }
    });
});

// UPDATE: Update an existing Garden
router.put('/put-garden-ajax', function (req, res, next) {
    let data = req.body;

    let gardenID = parseInt(data.gardenID);
    let gardenName = data.gardenName;
    let streetAddress = data.streetAddress;
    let city = data.city;
    let zip = data.zip;

    // if gardenID is not a number, send a 400 status code
    if (isNaN(gardenID)) {
        res.sendStatus(400);
        return;
    }

    // Update the Garden with the given gardenID
    let queryUpdateGarden = `UPDATE Gardens SET gardenName = ?, streetAddress = ?, city = ?, zip = ? WHERE gardenID = ?;`;

    // Select the updated Garden
    let selectUpdatedGarden = `SELECT * FROM Gardens WHERE gardenID = ?;`

    db.pool.query(queryUpdateGarden, [gardenName, streetAddress, city, zip, gardenID], function (error, rows, fields) {
        if (error) {            
            console.log(error);             // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectUpdatedGarden, [gardenID], function (error, rows, fields) {
                if (error) {
                    console.log(error);     // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    res.send(rows);         // send the result of query2 (the updated Garden) back to the client
                }
            });
        }
    });
});

// DELETE: Delete an existing Garden
router.delete('/delete-garden-ajax/', function (req, res, next) {
    let data = req.body;
    let gardenID = parseInt(data.id);

    // delete the Garden with the given gardenID from the Gardens table
    let deleteGardenFromGardens = `DELETE FROM Gardens WHERE gardenID = ?;`;

    // delete the Plot with the given associated gardenID from the Plots table
    let deleteGardenFromPlots = `DELETE FROM Plots WHERE gardenID = ?;`;

    db.pool.query(deleteGardenFromPlots, [gardenID], function (error, rows, fields) {
        if (error) {
            console.log(error);             // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(deleteGardenFromGardens, [gardenID], function (error, rows, fields) {
                if (error) {
                    console.log(error);     // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    res.sendStatus(204);    // send a 204 status code to indicate that the entity was successfully deleted
                }
            });
        }
    });
});

module.exports = router;