const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

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

module.exports = router;