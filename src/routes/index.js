const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

router.get('/index', (req, res) => {
    res.render('index');
});

// router.get('/gardens', (req, res) => {
//     let query1 = "SELECT gardenID AS ID, gardenName AS Name, streetAddress AS Address, city AS City, zip AS Zip FROM Gardens;";
//     let query2 = "SELECT gardenID, gardenName FROM Gardens;";

//     db.pool.query(query1, function (error, rows, fields) {              // Execute the query
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         } else {
//             db.pool.query(query2, function (error2, gardenIDs) {
//                 if (error2) {
//                     console.log(error2);
//                     res.sendStatus(400);
//                 } else {
//                     res.render('gardens', { data: rows, gardenIDs });   // Render the hbs file, and also send the renderer
//                 }
//             });
//         }
//     });
// });

// router.get('/plots', (req, res) => {
//     // join gardens and plots on gardenID
//     let query1 = "SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

//     // select all gardens to show in dropdown
//     let query2 = "SELECT gardenID, gardenName FROM Gardens;";
//     db.pool.query(query1, function(error, rows, fields){
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         } else {
//             db.pool.query(query2, function(error2, gardenIDs) {
//                 if (error2) {
//                     console.log(error2);
//                     res.sendStatus(400);
//                 } else {
//                     res.render('plots', { data: rows, gardenIDs });
//                 }
//             });
//         }
//     });
// });

// router.get('/plantsplots', (req, res) => {
//     let query1 = "SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;";

//     // select plotID, gardenName from plots joined with gardens on gardenID
//     let query2 = "SELECT Plots.plotID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";

//     // select plants to show in dropdown
//     let query3 = "SELECT plantID, varietyName, type FROM Plants ORDER BY plantID ASC;";

//     db.pool.query(query1, function(error, rows, fields){
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         }
//         else {
//             db.pool.query(query2, function(error2, plotIDs) {
//                 if (error2) {
//                     console.log(error2);
//                     res.sendStatus(400);
//                 }
//                 else {
//                     db.pool.query(query3, function(error3, plantIDs) {
//                         if (error3) {
//                             console.log(error3);
//                             res.sendStatus(400);
//                         }
//                         else {
//                             res.render('plantsplots', { data: rows, plotIDs, plantIDs });
//                         }
//                     });
//                 }
//             });
//         }

//     });
// });

// router.get('/plotsgardeners', (req, res) => {
//     // create query to join plots and gardens on gardenID, and join gardeners from PlotsGardeners on plotID
//     let query1 = "SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;";
//     // query all plots and garden name from joined plots and gardens
//     let query2 = "SELECT Plots.plotID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;";
//     // query all gardeners
//     let query3 = "SELECT gardenerID, firstName, lastName FROM Gardeners;";

//     db.pool.query(query1, function(error, rows, fields){
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         } else {
//             db.pool.query(query2, function(error2, plotIDs) {
//                 if (error2) {
//                     console.log(error2);
//                     res.sendStatus(400);
//                 } else {
//                     db.pool.query(query3, function(error3, gardenerIDs) {
//                         if (error3) {
//                             console.log(error3);
//                             res.sendStatus(400);
//                         } else {
//                             res.render('plotsgardeners', { data: rows, plotIDs, gardenerIDs });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });

// router.get('/gardeners', (req, res) => {
//     let query1 = "SELECT * FROM Gardeners;";
//     db.pool.query(query1, function (error, rows, fields) {
//         res.render('gardeners', { data: rows });

//     })
// });


// router.get('/invoicedetails', (req, res) => {
//     // join invoice details on plants by plantID and invoices by invoiceID and then gardeners by gardenerID, and then sort by invoice details ID
//     let query1 = "SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;";

//     // select all plants from Plants table to show in drop down
//     let query2 = "SELECT plantID, varietyName, type, price FROM Plants;";

//     // select all invoices from Invoices table and join with Gardeners on gardenerID to show in drop down
//     let query3 = "SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM Invoices INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID ASC;";

//     // execute queries
//     db.pool.query(query1, function(error, rows, fields){
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         } else {
//             db.pool.query(query2, function(error2, plantIDs) {
//                 if (error2) {
//                     console.log(error2);
//                     res.sendStatus(400);
//                 } else {
//                     db.pool.query(query3, function(error3, invoiceIDs) {
//                         if (error3) {
//                             console.log(error3);
//                             res.sendStatus(400);
//                         } else {
//                             res.render('invoicedetails', { data: rows, plantIDs, invoiceIDs });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });

// router.get('/invoices', (req, res) => {
//     let query1 = "SELECT * FROM Invoices;";
//     db.pool.query(query1, function (error, rows, fields) {
//         res.render('invoices', { data: rows });

//     })
// });

// router.get('/plants', function (req, res) {
//     let query1 = 'SELECT plantID AS "Id", varietyName AS "Variety", type AS "Type", price AS "Price" FROM Plants;';
//     let query2 = "SELECT plantID, varietyName, type FROM Plants;";

//     db.pool.query(query1, function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         } else {
//             db.pool.query(query2, function (error2, plantIDs) {
//                 if (error2) {
//                     console.log(error2);
//                     res.sendStatus(400);
//                 } else {
//                     res.render('plants', { data: rows, plantIDs });
//                 }
//             });
//         }
//     });
// });

module.exports = router;