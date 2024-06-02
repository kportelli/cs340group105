const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// CREATE
router.post('/add-plotgardener-ajax', function (req, res) {
    let data = req.body;
    console.log(data);

    // insert
    let query1 = `INSERT INTO PlotsGardeners (plotID, gardenerID) VALUES ('${data.plotID}', '${data.gardenerID}');`;
    
    // select to update the table
    let query2 = "SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;";

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
router.delete('/delete-plotgardener-ajax', function (req, res, next) {
    let data = req.body;
    let plantPlotID = parseInt(data.plotsGardenersID);
    let deleteFromPlantsPlots = `DELETE FROM PlotsGardeners WHERE plotsGardenersID = ?`;

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