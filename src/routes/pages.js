const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/gardens', (req, res) => {
    let query1 = "SELECT gardenID AS ID, gardenName AS Name, streetAddress AS Address, city AS City, zip AS Zip FROM Gardens;";
    let query2 = "SELECT gardenID, gardenName FROM Gardens;";

    db.pool.query(query1, function (error, rows, fields) {              // Execute the query
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error2, gardenIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    res.render('gardens', { data: rows, gardenIDs });   // Render the hbs file, and also send the renderer
                }
            });
        }
    });
});

router.get('/plots', (req, res) => {
    let query1 = "SELECT plotID AS ID, gardenID as gardenID;"


    // join gardens and plots on gardenID
    let query2 = "SELECT plotID AS ID, gardenID AS GardenID, plotNumber AS PlotNumber, plotSize AS PlotSize FROM Plots;";

    res.render('plots');
});

router.get('/plantsplots', (req, res) => {
    res.render('plantsplots');
});

router.get('/gardenersplots', (req, res) => {
    res.render('gardenersplots');
});

router.get('/gardeners', (req, res) => {
    let query1 = "SELECT * FROM Gardeners;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('gardeners', {data: rows});

    })
});



router.get('/invoicedetails', (req, res) => {
    res.render('invoicedetails');
});

router.get('/invoices', (req, res) => {
    res.render('invoices');
});

// router.get('/plants', (req, res) => {
//     let query1 = 'SELECT plantID AS "Id", varietyName AS "Variety", type AS "Type", price AS "Price" FROM Plants;';                       // Define the query
//     db.pool.query(query1, function(error, rows, fields){        // Execute the query
//         res.render('plants', {data: rows});                     // Render the hbs file, and also send the renderer
//     });
// });


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



module.exports = router;