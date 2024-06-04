const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// READ/DISPLAY/GET

router.get('/plots', (req, res) => {
    // join gardens and plots on gardenID
    let query1 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

    // select all gardens to show in dropdown
    let query2 = "SELECT gardenID, gardenName FROM Gardens;";
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, gardenIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    res.render('plots', { data: rows, gardenIDs });
                }
            });
        }
    });
});

// CREATE/INSERT/POST

router.post('/add-plot-ajax', function (req, res) {

    let data = req.body;
    let query1 = `INSERT INTO Plots (gardenID) VALUES ('${data.gardenID}');`;
    let query2 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {

                // Check to see if there was an error
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error)
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        };
    });
});

// DELETE

router.delete('/delete-plot-ajax/', function (req, res, next) {
    let data = req.body;
    let plotID = parseInt(data.plotID);
    let deleteFromPlotsGardeners = `DELETE FROM PlotsGardeners WHERE plotID = ?`;
    let deleteFromPlantsPlots = `DELETE FROM PlantsPlots WHERE plotID = ?`;
    let deleteFromPlots = `DELETE FROM Plots WHERE plotID = ?`;

    db.pool.query(deleteFromPlantsPlots, [plotID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(deleteFromPlotsGardeners, [plotID], function (error, rows, fields) {
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(deleteFromPlots, [plotID], function (error, rows, fields) {
                        if (error) {
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            //  Since we are just deleting 1 row and don't need to send back any new data,
                            // we will send back a status of 204 (No Content) common for PUT or DELETE.
                            res.sendStatus(204);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;