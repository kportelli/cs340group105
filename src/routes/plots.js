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

// GET: Get all Plots
router.get('/plots', (req, res) => {

    // get all plots joined with gardens and plots on gardenID
    let query1 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

    // select all gardens to show in dropdown
    let query2 = "SELECT gardenID, gardenName FROM Gardens;";
    
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
                    // Render the plots hbs file, and send results from query1 (rows) and results from query2 (gardenIDs)
                    res.render('plots', { data: rows, gardenIDs });
                }
            });
        }
    });
});

// POST: Create a new Plot
router.post('/add-plot-ajax', function (req, res) {
    let data = req.body;

    // Insert a new Plot with the gardenID from the form
    let query1 = `INSERT INTO Plots (gardenID) VALUES ('${data.gardenID}');`;

    // Select all Plots, joined with Gardens on gardenID, in sorted order
    let query2 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);                 // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error)          // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);             // send the results of query2 (Plots) back to the client
                }
            });
        };
    });
});

// DELETE: Delete a Plot
router.delete('/delete-plot-ajax/', function (req, res, next) {
    let data = req.body;
    let plotID = parseInt(data.plotID);

    // Delete the plot from the PlotsGardeners table
    let deleteFromPlotsGardeners = `DELETE FROM PlotsGardeners WHERE plotID = ?`;

    // Delete the plot from the PlantsPlots table
    let deleteFromPlantsPlots = `DELETE FROM PlantsPlots WHERE plotID = ?`;

    // Delete the plot from the Plots table
    let deleteFromPlots = `DELETE FROM Plots WHERE plotID = ?`;

    db.pool.query(deleteFromPlantsPlots, [plotID], function (error, rows, fields) {
        if (error) {
            console.log(error);                     // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(deleteFromPlotsGardeners, [plotID], function (error, rows, fields) {
                if (error) {
                    console.log(error);             // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(deleteFromPlots, [plotID], function (error, rows, fields) {
                        if (error) {
                            console.log(error);     // if there's an error, log it to console and return a 400 status code
                            res.sendStatus(400);
                        }
                        else {
                            res.sendStatus(204);    // send a 204 status code to indicate success
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;