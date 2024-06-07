const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

//DISPLAY/READ/GET

router.get('/plantsplots', (req, res) => {
    let query1 = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;";

    // select plotID, gardenName from plots joined with gardens on gardenID
    let query2 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

    // select plants to show in dropdown
    let query3 = "SELECT plantID, varietyName, type FROM Plants ORDER BY plantID ASC;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error2, plotIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(query3, function (error3, plantIDs) {
                        if (error3) {
                            console.log(error3);
                            res.sendStatus(400);
                        }
                        else {
                            res.render('plantsplots', { data: rows, plotIDs, plantIDs });
                        }
                    });
                }
            });
        }

    });
});


// CREATE
router.post('/add-plantplot-ajax', function (req, res) {
    let data = req.body;
    console.log(data);

    // insert
    let query1 = `INSERT INTO PlantsPlots (plantID, plotID) VALUES ('${data.plantID}', '${data.plotID}');`;
    // select to update the table
    let query2 = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE
router.delete('/delete-plantplot-ajax/', function (req, res, next) {
    let data = req.body;
    let plantPlotID = parseInt(data.plantsPlotsID);
    let deleteFromPlantsPlots = `DELETE FROM PlantsPlots WHERE plantsPlotsID = ?`;

    db.pool.query(deleteFromPlantsPlots, [plantPlotID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    });
});

router.put('/put-plantplot-ajax', function (req, res, next) {
    
    let data = req.body;
    let plantID = parseInt(data.plantID);
    let plotID = parseInt(data.plotID);
    let plantsPlotsID = parseInt(data.plantsPlotsID);

    let queryUpdatePlantPlot = `UPDATE PlantsPlots SET plantID = ?, plotID = ? WHERE plantsPlotsID = ?`;
    //let selectUpdatedPlantPlot = `SELECT * FROM  WHERE plantsPlotsID = ?`
    // select the updated plant plot
    let selectUpdatedPlantPlot = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID WHERE PlantsPlots.plantsPlotsID = ?;";
    
    // Run the 1st query
    db.pool.query(queryUpdatePlantPlot, [plantID, plotID, plantsPlotsID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectUpdatedPlantPlot, [plantsPlotsID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

module.exports = router;