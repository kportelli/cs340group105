-- Gardeners
-- -- [GET] get all Gardeners
SELECT * FROM Gardeners;
-- -- [POST] insert a new Gardener into the Gardeners table
INSERT INTO Gardeners (firstName, lastName, streetAddress, city, zip, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?);
-- -- [POST] select the last entered Gardener in the Gardeners table
SELECT * FROM Gardeners ORDER BY gardenerID DESC LIMIT 1;
-- -- [PUT] update a Gardener in the Gardeners table
UPDATE Gardeners SET firstName = ?, lastName = ?, streetAddress = ?, city = ?, zip = ?, phone = ?, email = ? WHERE gardenerID = ?;
-- -- [PUT] select a Gardener by ID
SELECT * FROM Gardeners WHERE gardenerID = ?;
-- -- [DELETE] delete a Gardener by ID
DELETE FROM Gardeners WHERE gardenerID = ?;

-- Gardens
-- -- [GET] select all Gardens with aliases
SELECT gardenID AS ID, gardenName AS Name, streetAddress AS Address, city AS City, zip AS Zip FROM Gardens;
-- -- [GET] select gardenID and gardenName from Gardens
SELECT gardenID, gardenName FROM Gardens;
-- -- [POST] insert a new Garden into the Gardens table
INSERT INTO Gardens (gardenName, streetAddress, city, zip) VALUES (?, ?, ?, ?);
-- -- [POST] select all gardens
SELECT * FROM Gardens;
-- -- [PUT] update a Garden in the Gardens table
UPDATE Gardens SET gardenName = ?, streetAddress = ?, city = ?, zip = ? WHERE gardenID = ?;
-- -- [PUT] select a Garden by ID
SELECT * FROM Gardens WHERE gardenID = ?;
-- -- [DELETE] delete a Garden by ID
DELETE FROM Gardens WHERE gardenID = ?;
-- -- [DELETE] delete plot by gardenID
DELETE FROM Plots WHERE gardenID = ?;

-- Invoice Details
-- -- [GET] select joined data from InvoiceDetails, Plants, Invoices, and Gardeners tables. Outer join Gardeners and Invoices so that ALL Invoices are returned, even if there is no matching gardenerID
SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID LEFT JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;
-- -- [GET] select all plants from the Plants table
SELECT plantID, varietyName, type, price FROM Plants;
-- -- [GET] select invoices and gardeners joined by gardenerID
SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM Invoices INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID ASC;
-- -- [POST] insert a new invoice detail into the InvoiceDetails table
INSERT INTO InvoiceDetails (plantID, invoiceID, price, quantity, lineTotal) VALUES (?, ?, ?, ?, ?);
-- -- [POST] update totalCost field in matching invoiceID in Invoices table
UPDATE Invoices SET totalCost = totalCost + ? WHERE Invoices.invoiceID = ?;
-- -- [POST] select joined data from InvoiceDetails, Plants, Invoices, and Gardeners tables in sorted order
SELECT InvoiceDetails.invoiceDetailID, Invoices.invoiceID, Plants.plantID, Plants.varietyName, Plants.type, InvoiceDetails.quantity, InvoiceDetails.price, InvoiceDetails.lineTotal, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName FROM InvoiceDetails INNER JOIN Plants ON InvoiceDetails.plantID = Plants.plantID INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID INNER JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY InvoiceDetails.invoiceDetailID ASC;

-- Invoices
-- -- [GET] select all Invoices gardeners by joining Invoices and Gardeners on gardenerID. Outer join Gardeners and Invoices so that ALL Invoices are returned, even if there is no matching gardenerID
SELECT * FROM Invoices LEFT JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID;
-- -- [GET] select relevant Gardener columns for dropdown menu to display names with PKs
SELECT gardenerID, firstName, lastName FROM Gardeners;
-- -- [POST] insert a new Invoice into the Invoices table
INSERT INTO Invoices (gardenerID, totalCost) VALUES (?, ?);
-- -- [POST] select the last row from the Invoices table joined with Gardeners on gardenerID
SELECT Invoices.invoiceID, Gardeners.gardenerID, Gardeners.firstName, Gardeners.lastName, Invoices.totalCost FROM Invoices JOIN Gardeners ON Invoices.gardenerID = Gardeners.gardenerID ORDER BY Invoices.invoiceID DESC LIMIT 1;

-- Plants
-- -- [GET] select all Plants data for display
SELECT plantID AS "Id", varietyName AS "Variety", type AS "Type", price AS "Price" FROM Plants;
-- -- [GET] select all plantIDs and varietyNames from the Plants table
SELECT plantID, varietyName, type FROM Plants;
-- -- [POST] insert a new Plant into the Plants table
INSERT INTO Plants (varietyName, type, price) VALUES (?, ?, ?);
-- -- [POST] get the last row in the Plants table
SELECT * FROM Plants ORDER BY plantID DESC LIMIT 1;
-- -- [PUT] update Plant with new price value
UPDATE Plants SET price = ? WHERE plantID = ?;
-- -- [PUT] select a Plant by ID
SELECT * FROM Plants WHERE plantID = ?;
-- -- [DELETE] delete the Plants row with the matching ID 
DELETE FROM Plants WHERE plantID = ?;
-- -- [DELETE] delete the InvoiceDetails row with the matching plantID
DELETE FROM InvoiceDetails WHERE plantID = ?;
-- -- [DELETE] delete the PlantsPlots row with the matching plantID
DELETE FROM PlantsPlots WHERE plantID = ?;

-- PlantsPlots
-- -- [GET] select all PlantsPlots data joined with Plots, Plants, and Gardens
SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;
-- -- [GET] select Plots and Gardens data to show in dropdown, joined on gardenID
SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;
-- -- [GET] select Plants data to show in dropdown
SELECT plantID, varietyName, type FROM Plants ORDER BY plantID ASC;
-- -- [POST] insert a new PlantPlot into the PlantsPlots table
INSERT INTO PlantsPlots (plantID, plotID) VALUES (?, ?);
-- -- [POST] select all PlantsPlots data joined with Plots, Plants, and Gardens
SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC;
-- -- [DELETE] delete the PlantPlot from the PlantPlots table
DELETE FROM PlantsPlots WHERE plantsPlotsID = ?;
-- -- [PUT] update plantID and plotID on the PlantPlot with the given plantsPlotsID
UPDATE PlantsPlots SET plantID = ?, plotID = ? WHERE plantsPlotsID = ?;
-- -- [PUT] select the updated plant plot, joined with Plants, Plots, and Gardens
SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID WHERE PlantsPlots.plantsPlotsID = ?;

-- Plots
-- -- [GET] get all plots joined with gardens and plots on gardenID
SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;
-- -- [GET] select all gardens to show in dropdown
SELECT gardenID, gardenName FROM Gardens;
-- -- [POST] insert a new Plot with the gardenID from the form
INSERT INTO Plots (gardenID) VALUES (?);
-- -- [POST] select all Plots, joined with Gardens on gardenID, in sorted order
SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;
-- -- [DELETE] delete the plot from the PlotsGardeners table
DELETE FROM PlotsGardeners WHERE plotID = ?;
-- -- [DELETE] delete the plot from the PlantsPlots table
DELETE FROM PlantsPlots WHERE plotID = ?;
-- -- [DELETE] delete the plot from the Plots table
DELETE FROM Plots WHERE plotID = ?;

-- PlotsGardeners
-- -- [GET] select plots and gardens on gardenID, and gardeners from PlotsGardeners joined on plotID in sorted order
SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;
-- -- [GET] select all plots and gardens from joined plots and gardens for use in first dropdown
SELECT Plots.plotID, Gardens.gardenID, Gardens.gardenName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY Plots.plotID ASC;
-- -- [GET] query all gardeners for use in second dropdown
SELECT gardenerID, firstName, lastName FROM Gardeners;
-- -- [POST] insert new PlotsGardeners intersection row
INSERT INTO PlotsGardeners (plotID, gardenerID) VALUES (?, ?);
-- -- [POST] select to update the table
SELECT PlotsGardeners.plotsGardenersID, Plots.plotID, Gardens.gardenID, Gardeners.gardenerID, Gardens.gardenName, Gardeners.firstName, Gardeners.lastName FROM Plots INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID INNER JOIN PlotsGardeners ON Plots.plotID = PlotsGardeners.plotID INNER JOIN Gardeners ON PlotsGardeners.gardenerID = Gardeners.gardenerID ORDER BY PlotsGardeners.plotsGardenersID ASC;
-- -- [DELETE] delete specified PlotsGardeners row
DELETE FROM PlotsGardeners WHERE plotsGardenersID = ?;