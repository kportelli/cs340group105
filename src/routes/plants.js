const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// CREATE/INSERT/POST

router.post('/add-plant-ajax', function (req, res) {

    let data = req.body;
    console.log(data);

    // capture NULL values
    let price = parseFloat(data.price);
    if (isNaN(price)) {
        price = 'NULL';
    }

    query1 = `INSERT INTO Plants (varietyName, type, price) VALUES ('${data.varietyName}', '${data.type}', ${price})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Plants;`;
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


// DELETE

router.delete('/delete-plant-ajax/', function (req, res, next) {
    let data = req.body;
    let plantID = parseInt(data.id);
    let deletePlant = `DELETE FROM Plants WHERE plantID = ?`;


    // Run the 1st query
    db.pool.query(deletePlant, [plantID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            db.pool.query(deletePlant, [plantID], function (error, rows, fields) {

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
    })
});

module.exports = router;