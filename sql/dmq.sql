-- These are database manipulation queries for the Growing Our Community database

-- Gardens
-- -- -- add a new garden into `gardens` table
INSERT INTO Gardens (gardenName, streetAddress, city, zip) VALUES (:gardenName, :streetAddress, :city, :zip)

-- -- -- get all gardens
SELECT gardenID, gardenName, streetAddress, city, zip FROM Gardens

-- -- -- get all plots in a garden
SELECT * FROM plots WHERE gardenID = :gardenID

-- -- -- update a garden's attributes based on provided gardenID
UPDATE Gardens SET gardenName = :gardenName, streetAddress = :streetAddress, city = :city, zip = :zip WHERE gardenID = :gardenID

-- -- -- delete a garden based on provided gardenID (and cascade delete all plots in the garden)
DELETE FROM Gardens WHERE gardenID = :gardenID

-- Plots
-- -- -- add a new plot into `plots` table
INSERT INTO Plots (gardenID) VALUES (:gardenID)

-- -- -- add a plant to a plot
INSERT INTO PlantsPlots (plotID, plantID) VALUES (:plotID, :plantID)

-- -- -- get all plots
SELECT plotID, gardenID FROM Plots

-- -- -- get all plants in a plot
SELECT plantID, varietyName, type, price FROM Plants INNER JOIN PlantsPlots ON Plants.plantID = PlantsPlots.plantID WHERE plotID = :plotID

-- -- -- remove a plant from a plot
DELETE FROM PlantsPlots WHERE plantPlotID = :plantPlotID

-- Gardeners
-- -- -- add a new gardener into `gardeners` table
INSERT INTO Gardeners (fname, lname, streetAddress, city, zip, phone, email) VALUES (:fname, :lname, :streetAddress, :city, :zip, :phone, :email)

-- -- -- get all gardeners
SELECT gardenerID, fname, lname, streetAddress, city, zip, phone, email FROM Gardeners

-- -- -- get all plants a gardener is responsible for
SELECT Plants.varietyName, Plants.type, PlantsPlots.plantsPlotsID
FROM Gardeners
INNER JOIN PlotsGardeners ON Gardeners.gardenerID = PlotsGardeners.gardenerID
INNER JOIN PlantsPlots ON PlotsGardeners.plotID = PlantsPlots.plotID
INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID
WHERE Gardeners.gardenerID = :gardenerID;

-- -- -- get all gardeners in special form for dropdown in order to select all plants a gardener is responsible for
SELECT gardenerID, fname, lname FROM Gardeners

-- -- -- get a list of all invoices belonging to a gardener
SELECT invoiceID, gardenerID, totalCost FROM Invoices WHERE gardenerID = :gardenerID

-- -- -- update a gardener's attributes based on provided gardenerID
UPDATE Gardeners SET fname = :fname, lname = :lname, streetAddress = :streetAddress, city = :city, zip = :zip, phone = :phone, email = :email WHERE gardenerID = :gardenerID

-- -- -- delete a gardener based on provided gardenerID (and cascade delete all plots the gardener is responsible for)
DELETE FROM Gardeners WHERE gardenerID = :gardenerID
-- -- -- -- update Gardener's invoices to show GardenerID as NULL
UPDATE Invoices SET gardenerID = NULL WHERE gardenerID = :gardenerID

-- Plants
-- -- -- add a new Plant into Plants table
INSERT INTO plants (varietyName, type, price) VALUES (:varietyName, :type, :price)

-- -- -- view all plants
SELECT plantID, varietyName, type FROM gardens

-- -- -- update a plant's attributes based on provided plantID
UPDATE plants SET varietyName = :varietyName, type = :type, price = :price WHERE plantID = :plantID

-- -- -- delete a plant based on provided plantID 
DELETE FROM plants WHERE plantID = :plantID

-- Invoices
-- -- -- add a new Invoice into Invoices table
INSERT INTO invoices (gardenerID, totalCost) VALUES (:gardenerID, :type, :totalCost)

-- -- -- view all Invoices
SELECT invoiceID, gardenerID, totalCost FROM invoices

-- -- -- update an invoice's attributes based on provided invoiceID
UPDATE invoices SET gardenerID = :gardenerID, totalCost = :totalCost WHERE invoiceID = :invoiceID

-- -- -- delete an invoice based on provided invoiceID 
DELETE FROM invoices WHERE invoiceID = :invoiceID
