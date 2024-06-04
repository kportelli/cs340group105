const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// DISPLAY/READ/GET

router.get('/plants', function (req, res) {
    let query1 = 'SELECT plantID AS "Id", varietyName AS "Variety", type AS "Type", price AS "Price" FROM Plants;';
    let query2 = "SELECT plantID, varietyName, type FROM Plants;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, plantIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    res.render('plants', { data: rows, plantIDs });
                }
            });
        }
    });
});

// CREATE/INSERT/POST

router.post('/add-plant-ajax', function (req, res) {

    let data = req.body;
    console.log(data);

    // capture NULL values
    let price = parseFloat(data.price);
    if (isNaN(price)) {
        price = 'NULL';
    }

    query1 = `INSERT INTO Plants (varietyName, type, price) VALUES (?, ?, ?)`;

    // get the last row in the Plants table (just added)
    query2 = `SELECT * FROM Plants ORDER BY plantID DESC LIMIT 1;`;
    db.pool.query(query1, [data.varietyName, data.type, data.price], function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

router.put('/put-plant-ajax', function (req, res, next) {
    let data = req.body;

    let plantID = parseInt(data.plantID);
    let price = parseFloat(data.price);

    if (isNaN(price)) {
        res.sendStatus(400);
        return;
    }

    let queryUpdateplant = `UPDATE Plants SET price = ? WHERE plantID = ?`;
    let selectUpdatedPlant = `SELECT * FROM Plants WHERE plantID = ?`

    // Run the 1st query
    db.pool.query(queryUpdateplant, [price, plantID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectUpdatedPlant, [plantID], function (error, rows, fields) {

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

router.delete('/delete-plant-ajax/', function (req, res, next) {
    let data = req.body;
    let plantID = parseInt(data.id);
    let deletePlantFromPlants = `DELETE FROM Plants WHERE plantID = ?`;
    let deletePlantFromInvoiceDetails = `DELETE FROM InvoiceDetails WHERE plantID = ?`;
    let deletePlantFromPlantsPlots = `DELETE FROM PlantsPlots WHERE plantID = ?`;

    db.pool.query(deletePlantFromPlantsPlots, [plantID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(deletePlantFromInvoiceDetails, [plantID], function (error, rows, fields) {
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // Run the second query
                    db.pool.query(deletePlantFromPlants, [plantID], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            //  Since we are just deleting 1 row and don't need to send back any new data,
                            // we will send back a status of 204 (No Content) common for PUT or DELETE.
                            res.sendStatus(204);
                        }
                    })
                }
            });
        }
    });
});

module.exports = router;