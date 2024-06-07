const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');


// DISPLAY/READ/GET

router.get('/invoicedetails', (req, res) => {
    // join invoice details on plants by plantID and invoices by invoiceID and then gardeners by gardenerID, and then sort by invoice details ID
    let query1 = "SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;";

    // select all plants from Plants table to show in drop down
    let query2 = "SELECT plantID, varietyName, type, price FROM Plants;";

    // select all invoices from Invoices table and join with Gardeners on gardenerID to show in drop down
    let query3 = "SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM Invoices INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID ASC;";

    // execute queries
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
                    db.pool.query(query3, function (error3, invoiceIDs) {
                        if (error3) {
                            console.log(error3);
                            res.sendStatus(400);
                        } else {
                            res.render('invoicedetails', { data: rows, plantIDs, invoiceIDs });
                        }
                    });
                }
            });
        }
    });
});


// CREATE/INSERT/POST

router.post('/add-invoicedetail-ajax', function (req, res) {

    let data = req.body;
    let query1 = `INSERT INTO InvoiceDetails (plantID, invoiceID, price, quantity, lineTotal) VALUES ('${data.plantID}', '${data.invoiceID}', '${data.price}', '${data.quantity}', '${data.lineTotal}')`;

    let query2 = `UPDATE Invoices SET totalCost = totalCost + '${data.lineTotal}' WHERE Invoices.invoiceID = '${data.invoiceID}';`;

    let query3 = "SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.plantID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;";


    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log("invoice details query1 error")
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log("invoice details query2 error");
                    res.sendStatus(400);
                } else {
                    db.pool.query(query3, function (error, rows, fields) {
                        if (error) {
                            console.log("invoice details query3 error");
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    });
                }
            });
        }
    });
});


// DELETE
// router.delete('/delete-invoicedetail-ajax/', function (req, res, next) {
//     let data = req.body;
//     let invoiceDetailID = parseInt(data.invoiceDetailID);
//     let deleteFromInvoiceDetails = `DELETE FROM InvoiceDetails WHERE invoiceDetailID = ?`;

//     db.pool.query(deleteFromInvoiceDetails, [invoiceDetailID], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//             res.sendStatus(400);
//         } else {
//             res.sendStatus(204);
//         }
//     });
// });


module.exports = router;