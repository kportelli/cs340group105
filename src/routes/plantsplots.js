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

// GET: Get all PlantsPlots
router.get('/plantsplots', (req, res) => {

    // select all PlantsPlots data joined with Plots, Plants, and Gardens
    let query1 = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;";

    // select Plots and Gardens data to show in dropdown, joined on gardenID
    let query2 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

    // select Plants data to show in dropdown
    let query3 = "SELECT plantID, varietyName, type FROM Plants ORDER BY plantID ASC;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);                     // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error2, plotIDs) {
                if (error2) {
                    console.log(error2);            // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(query3, function (error3, plantIDs) {
                        if (error3) {
                            console.log(error3);    // if there's an error, log it to console and return a 400 status code
                            res.sendStatus(400);
                        }
                        else {
                            // Render the plantsplots hbs file, and send results from query1 (rows), query2 (plotIDs), and query3 (plantIDs)
                            res.render('plantsplots', { data: rows, plotIDs, plantIDs });
                        }
                    });
                }
            });
        }
    });
});

// POST: Create a new PlantPlot
router.post('/add-plantplot-ajax', function (req, res) {
    let data = req.body;
    console.log(data);

    // insert a new PlantPlot into the PlantsPlots table
    let query1 = `INSERT INTO PlantsPlots (plantID, plotID) VALUES ('${data.plantID}', '${data.plotID}');`;
    
    // select all PlantsPlots data joined with Plots, Plants, and Gardens
    let query2 = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;";

    db.pool.query(query1, function (error, rows, fields) {
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
                    res.send(rows);         // send the newly created PlantPlot back to the client
                }
            });
        }
    });
});

// DELETE: Delete an existing PlantPlot
router.delete('/delete-plantplot-ajax/', function (req, res, next) {
    let data = req.body;
    let plantPlotID = parseInt(data.plantsPlotsID);

    // delete the PlantPlot from the PlantsPlots table
    let deleteFromPlantsPlots = `DELETE FROM PlantsPlots WHERE plantsPlotsID = ?`;

    db.pool.query(deleteFromPlantsPlots, [plantPlotID], function (error, rows, fields) {
        if (error) {
            console.log(error);         // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);        // send a 204 status code to indicate the deletion was successful
        }
    });
});

// PUT: Update an existing PlantPlot
router.put('/put-plantplot-ajax', function (req, res, next) {
    
    let data = req.body;
    let plantID = parseInt(data.plantID);
    let plotID = parseInt(data.plotID);
    let plantsPlotsID = parseInt(data.plantsPlotsID);

    // update plantID and plotID on the PlantPlot with the given plantsPlotsID
    let queryUpdatePlantPlot = `UPDATE PlantsPlots SET plantID = ?, plotID = ? WHERE plantsPlotsID = ?`;

    // select the updated plant plot, joined with Plants, Plots, and Gardens
    let selectUpdatedPlantPlot = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID WHERE PlantsPlots.plantsPlotsID = ?;";
    
    db.pool.query(queryUpdatePlantPlot, [plantID, plotID, plantsPlotsID], function (error, rows, fields) {
        if (error) {
            console.log(error);                 // if there's an error, log it to console and return a 400 status code
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectUpdatedPlantPlot, [plantsPlotsID], function (error, rows, fields) {
                if (error) {
                    console.log(error);         // if there's an error, log it to console and return a 400 status code
                    res.sendStatus(400);
                } else {
                    res.send(rows);             // send the updated PlantPlot back to the client
                }
            });
        }
    });
});

module.exports = router;