const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

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

router.put('/put-plot-ajax', function (req, res, next) {
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

    let queryUpdateGarden = `UPDATE Gardens SET gardenName = ?, streetAddress = ?, city = ?, zip = ? WHERE gardenID = ?`;
    let selectUpdatedGarden = `SELECT * FROM Gardens WHERE gardenID = ?`

    // Run the 1st query
    db.pool.query(queryUpdateGarden, [gardenName, streetAddress, city, zip, gardenID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectUpdatedGarden, [gardenID], function (error, rows, fields) {

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

// DELETE

router.delete('/delete-plot-ajax/', function (req, res, next) {
    let data = req.body;
    let gardenID = parseInt(data.id);
    let deleteGardenFromGardens = `DELETE FROM Gardens WHERE gardenID = ?`;
    let deleteGardenFromPlots = `DELETE FROM Plots WHERE gardenID = ?`;

    db.pool.query(deleteGardenFromPlots, [gardenID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(deleteGardenFromGardens, [gardenID], function (error, rows, fields) {
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
});

module.exports = router;