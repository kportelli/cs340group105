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
    // join gardens and plots on gardenID
    let query1 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";
    
    // select all gardens to show in dropdown
    let query2 = "SELECT gardenID, gardenName FROM Gardens;";
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function(error2, gardenIDs) {
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

router.get('/plantsplots', (req, res) => {
    let query1 = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;";

    // select plotID, gardenName from plots joined with gardens on gardenID
    let query2 = "SELECT Plots.plotID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

    // select plants to show in dropdown
    let query3 = "SELECT plantID, varietyName, type FROM Plants ORDER BY plantID ASC;";

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, function(error2, plotIDs) {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(query3, function(error3, plantIDs) {
                        if (error3) {
                            console.log(error3);
                            res.sendStatus(400);
                        }
                        else {
                            res.render('plantsplots', { data: rows, plotIDs, plantIDs });
                        }
                    });
                }
            });
        }
        
    });
});

router.get('/plotsgardeners', (req, res) => {
    res.render('plotsgardeners');
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