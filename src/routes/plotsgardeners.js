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

// GET: Get all PlotsGardeners
router.get('/plotsgardeners', (req, res) => {

    // select plots and gardens on gardenID, and gardeners from PlotsGardeners joined on plotID in sorted order
    let query1 = `SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;`;
    
    // select all plots and gardens from joined plots and gardens for use in first dropdown
    let query2 = `SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;`;
    
    // query all gardeners for use in second dropdown
    let query3 = `SELECT gardenerID, firstName, lastName FROM Gardeners;`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);                         // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, plotIDs) {
                if (error2) {
                    console.log(error2);                // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    db.pool.query(query3, function (error3, gardenerIDs) {
                        if (error3) {
                            console.log(error3);        // if there's an error, log it to console and return a 400 status code
                            res.sendStatus(400);
                        } else {
                            // Render the plotsgardeners hbs file, and send results from query1 (rows), query2 (plotIDs), and query3 (gardenerIDs)
                            res.render('plotsgardeners', { data: rows, plotIDs, gardenerIDs });
                        }
                    });
                }
            });
        }
    });
});

// POST: Create a new PlotsGardeners row
router.post('/add-plotgardener-ajax', function (req, res) {
    let data = req.body;

    // insert new PlotsGardeners intersection row
    let query1 = `INSERT INTO PlotsGardeners (plotID, gardenerID) VALUES (?, ?);`;

    // select to update the table
    let query2 = `SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;`;

    db.pool.query(query1, [data.plotID, data.gardenerID], function (error, rows, fields) {
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
                    res.send(rows);         // send the results of query2 back to the client
                }
            });
        }
    });
});

// DELETE: Delete a PlotsGardeners row
router.delete('/delete-plotgardener-ajax', function (req, res, next) {
    let data = req.body;
    let plantPlotID = parseInt(data.plotsGardenersID);

    // delete specified PlotsGardeners row
    let deleteFromPlantsPlots = `DELETE FROM PlotsGardeners WHERE plotsGardenersID = ?`;

    db.pool.query(deleteFromPlantsPlots, [plantPlotID], function (error, rows, fields) {
        if (error) {
            console.log(error);        // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);        // send a 204 status code to indicate success
        }
    });
});

module.exports = router;