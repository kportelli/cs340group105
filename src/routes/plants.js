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

// GET: Get all Plants
router.get('/plants', function (req, res) {

    // select all Plants data for display
    let query1 = `SELECT plantID AS "Id", varietyName AS "Variety", type AS "Type", price AS "Price" FROM Plants;`;

    // select all plantIDs and varietyNames from the Plants table
    let query2 = `SELECT plantID, varietyName, type FROM Plants;`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);             // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, plantIDs) {
                if (error2) {
                    console.log(error2);    // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    // Render the plants hbs file, and send results from query1 (rows) and results from query2 (plantIDs)
                    res.render('plants', { data: rows, plantIDs });
                }
            });
        }
    });
});

// POST: Create a new Plant
router.post('/add-plant-ajax', function (req, res) {
    let data = req.body;

    // check that new Price input value is a valid float
    let price = parseFloat(data.price);
    if (isNaN(price)) {
        price = 'NULL';
    }

    // insert new Plants data into the Plants table
    query1 = `INSERT INTO Plants (varietyName, type, price) VALUES (?, ?, ?);`;

    // get the last row in the Plants table (just added)
    query2 = `SELECT * FROM Plants ORDER BY plantID DESC LIMIT 1;`;

    db.pool.query(query1, [data.varietyName, data.type, data.price], function (error, rows, fields) {
        if (error) {
            console.log(error)          // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error); // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);     // send the newly created Plant back to the client
                }
            });
        }
    });
});

// PUT: Update an existing Plant
router.put('/put-plant-ajax', function (req, res, next) {
    let data = req.body;
    let plantID = parseInt(data.plantID);
    let price = parseFloat(data.price);

    // check that given price is valid
    if (isNaN(price)) {
        res.sendStatus(400);
        return;
    }

    // Update Plant with new price value
    let queryUpdateplant = `UPDATE Plants SET price = ? WHERE plantID = ?;`;

    // Select newly updated Plant row for update in table
    let selectUpdatedPlant = `SELECT * FROM Plants WHERE plantID = ?;`

    db.pool.query(queryUpdateplant, [price, plantID], function (error, rows, fields) {
        if (error) {
            console.log(error);                 // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectUpdatedPlant, [plantID], function (error, rows, fields) {
                if (error) {
                    console.log(error);         // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    res.send(rows);             // send the updated Plant back to the client
                }
            });
        }
    });
});

// DELETE: Delete an existing Plant
router.delete('/delete-plant-ajax/', function (req, res, next) {
    let data = req.body;
    let plantID = parseInt(data.id);

    // delete the Plants row with the matching ID 
    let deletePlantFromPlants = `DELETE FROM Plants WHERE plantID = ?;`;

    // Also delete the Plant from InvoiceDetails
    let deletePlantFromInvoiceDetails = `DELETE FROM InvoiceDetails WHERE plantID = ?;`;

    // Also delete the Plant from PlantsPlots
    let deletePlantFromPlantsPlots = `DELETE FROM PlantsPlots WHERE plantID = ?;`;

    db.pool.query(deletePlantFromPlantsPlots, [plantID], function (error, rows, fields) {
        if (error) {
            console.log(error);                         // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(deletePlantFromInvoiceDetails, [plantID], function (error, rows, fields) {
                if (error) {
                    console.log(error);                 // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(deletePlantFromPlants, [plantID], function (error, rows, fields) {
                        if (error) {
                            console.log(error);         // if there's an error, log it to console and return a 400 status code
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(204);        // send a 204 status code to indicate success
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;