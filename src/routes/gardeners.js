const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

// DISPLAY/READ/GET

router.get('/gardeners', (req, res) => {
    let query1 = "SELECT * FROM Gardeners;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('gardeners', { data: rows });

    })
});


// CREATE a Gardener

router.post('/add-gardener-ajax', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Gardeners (firstName, lastName, streetAddress, city, zip, email, phone) VALUES (
        ?, ?, ?, ?, ?, ?, ?);`;
    query2 = `SELECT * FROM Gardeners ORDER BY gardenerID DESC LIMIT 1;`;

    db.pool.query(query1, [data.firstName, data.lastName, data.streetAddress, data.city, data.zip, data.email, data.phone], function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
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

// UPDATE a Gardener

router.put('/put-gardener-ajax', function (req, res, next) {
    let data = req.body;
    
    let gardenerID = parseInt(data.gardenerID);
    let gardenerfirstName = data.firstName;
    let gardenerlastName = data.lastName;
    let streetAddress = data.streetAddress;
    let city = data.city;
    let zip = data.zip;
    let phone = data.phone;
    let email = data.email;


    // if gardenerID is not a number, send a 400 status code
    if (isNaN(gardenerID)) {
        res.sendStatus(400);
        console.log("gardenerID is not a number");
        return;
    }

    let queryUpdateGardener = `UPDATE Gardeners SET firstName = ?, lastName = ?, streetAddress = ?, city = ?, zip = ?, phone = ?, email = ? WHERE gardenerID = ?`;
    let selectUpdatedGardener = `SELECT * FROM Gardeners WHERE gardenerID = ?`

    // Run the 1st query
    db.pool.query(queryUpdateGardener, [gardenerfirstName, gardenerlastName, streetAddress, city, zip, phone, email, gardenerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectUpdatedGardener, [gardenerID], function (error, rows, fields) {

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

// DELETE a Gardener

router.delete('/delete-gardener-ajax/', function (req, res, next) {
    let data = req.body;
    let gardenerID = parseInt(data.id);
    let deleteGardener = `DELETE FROM Gardeners WHERE gardenerID = ?`;

    // note: when a gardenerID is deleted, 
    // referencing Invoice rows set gardenerID to NULL;
    // referencing PlotsGardeners rows are also deleted via CASCADE

    // Run the query
    db.pool.query(deleteGardener, [gardenerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

module.exports = router;