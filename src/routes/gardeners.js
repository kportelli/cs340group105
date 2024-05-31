const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

router.post('/add-gardener-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // // Capture NULL values
    // let homeworld = parseInt(data.homeworld);
    // if (isNaN(homeworld)) {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data.age);
    // if (isNaN(age)) {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Gardeners (firstName, lastName, streetAddress, city, zip, email, phone) VALUES ('${data.fname}', '${data.lname}', '${data.address_gardener}', '${data.city_gardener}','${data.zip_gardener}','${data.email}', '${data.phone}');`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Gardeners;`;
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

module.exports = router;