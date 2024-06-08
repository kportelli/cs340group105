const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');


// DISPLAY/READ/GET

router.get('/plotsgardeners', (req, res) => {
    // create query to join plots and gardens on gardenID, and join gardeners from PlotsGardeners on plotID
    let query1 = "SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;";
    // query all plots and garden name from joined plots and gardens for use in first dropdown
    let query2 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";
    // query all gardeners for use in second dropdown
    let query3 = "SELECT gardenerID, firstName, lastName FROM Gardeners;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, plotIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    db.pool.query(query3, function (error3, gardenerIDs) {
                        if (error3) {
                            console.log(error3);
                            res.sendStatus(400);
                        } else {
                            res.render('plotsgardeners', { data: rows, plotIDs, gardenerIDs });
                        }
                    });
                }
            });
        }
    });
});


// CREATE
router.post('/add-plotgardener-ajax', function (req, res) {

    // receive input fields
    let data = req.body;
    console.log(data);

    // insert new PlotsGardeners intersection row
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

    // recieve plotsgardeners ID to delete
    let data = req.body;

    // pull out plotsgardeners ID
    let plantPlotID = parseInt(data.plotsGardenersID);

    // delete specifified PlotsGardeners row
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