-- Alaaddin Hiefield and Kathryn Portelli
-- Group 105
-- Step 2 Draft

-- --------------------------------------------------------
-- Table structure for table `Gardens`
--
CREATE TABLE Gardens (
  gardenID int(11) NOT NULL AUTO_INCREMENT,
  gardenName varchar(145) NOT NULL,
  streetAddress varchar(145) NOT NULL,
  city varchar(145) NOT NULL,
  zip varchar(45) NOT NULL,
  PRIMARY KEY (gardenID)
);

-- --------------------------------------------------------

--
-- Table structure for table `Gardeners`
--

CREATE TABLE Gardeners (
  gardenerID int(11) NOT NULL AUTO_INCREMENT,
  firstName varchar(145) NOT NULL,
  lastName varchar(145) NOT NULL,
  streetAddress varchar(145) NOT NULL,
  city varchar(145) NOT NULL,
  zip varchar(45) NOT NULL,
  email varchar(145) NOT NULL,
  phone varchar(45) NOT NULL,
  PRIMARY KEY (gardenerID)
);

-- --------------------------------------------------------

--
-- Table structure for table `Plants`
--

CREATE TABLE Plants (
  plantID int(11) NOT NULL AUTO_INCREMENT,
  varietyName varchar(145) NOT NULL,
  type varchar(145) NOT NULL,
  price decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (plantID)
);

-- --------------------------------------------------------

--
-- Table structure for table `Plots`
--

CREATE TABLE Plots (
  plotID int(11) NOT NULL AUTO_INCREMENT,
  gardenID int(11) NOT NULL,
  PRIMARY KEY (plotID),
  FOREIGN KEY (gardenID) REFERENCES Gardens (gardenID) ON DELETE CASCADE ON UPDATE CASCADE
);


-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE Invoices (
  invoiceID int(11) NOT NULL AUTO_INCREMENT,
  gardenerID int(11) NOT NULL,
  totalCost decimal(19,2) NOT NULL,
  PRIMARY KEY (invoiceID),
  FOREIGN KEY (gardenerID) REFERENCES Gardeners (gardenerID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- --------------------------------------------------------
--
-- Table structure for table `InvoiceDetails`
--

CREATE TABLE InvoiceDetails (
  invoiceDetailID int(11) NOT NULL AUTO_INCREMENT,
  plantID int(11) NOT NULL,
  invoiceID int(11) NOT NULL,
  price decimal(19,2) NOT NULL,
  quantity int(11) NOT NULL,
  lineTotal decimal(19,2) NOT NULL,
  PRIMARY KEY (invoiceDetailID),
  FOREIGN KEY (plantID) REFERENCES Plants (plantID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (invoiceID) REFERENCES Invoices (invoiceID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------
--
-- Table structure for table `PlantsPlots`
--

CREATE TABLE PlantsPlots (
  plantsPlotsID int(11) NOT NULL AUTO_INCREMENT,
  plantID int(11) NOT NULL,
  plotID int(11) NOT NULL,
  PRIMARY KEY (plantsPlotsID),
  FOREIGN KEY (plantID) REFERENCES Plants (plantID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (plotID) REFERENCES Plots (plotID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------
--
-- Table structure for table `PlotsGardeners`
--

CREATE TABLE PlotsGardeners (
  plotsGardenersID int(11) NOT NULL AUTO_INCREMENT,
  plotID int(11) NOT NULL,
  gardenerID int(11) NOT NULL,
  PRIMARY KEY (plotsGardenersID),
  FOREIGN KEY (gardenerID) REFERENCES Gardeners (gardenerID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (plotID) REFERENCES Plots (plotID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- --------------------------------------------------------


/*
Seed database
*/

-- Insert data into Gardens
INSERT INTO Gardens (gardenName, streetAddress, city, zip) VALUES
('New Beginnings', '456 E Forest St.', 'Portland', '97086'),
('Dirt Patch', '10 S Desert Pkwy.', 'Denver', '80123'),
('Icy Valley', '123 Glacier Highway', 'Juneau', '99801'),
('Oldtown Acres', '246 Cedar Street', 'Lansing', '48901'),
('Senior Village', '100 Methusalah Way', 'Palm Springs', '92240');

-- Insert data into Gardeners
INSERT INTO Gardeners (firstName, lastName, streetAddress, city, zip, email, phone) VALUES
('Joe', 'Schmoe', '555 W Lake Dr.', 'Portland', '97123', 'joe.schmoe@email.com', '504-621-8927'),
('Alice', 'Smith', '234 Elm St.', 'Aurora', '80015', 'alice.smith@email.com', '810-292-9388'),
('Carol', 'White', '135 Birch St.', 'Aurora', '80016', 'carol.white@email.com', '856-636-8749'),
('Josephine', 'Darakjy', '4 B Blue Ridge Blvd', 'Brighton', '48116', 'josephine_darakjy@darakjy.org', '513-570-1893'),
('Art', 'Venere', '8 W Cerritos Ave #54', 'Bridgeport', '80145', 'art@venere.org', '419-503-2484'),
('Lenna', 'Paprocki', '639 Main St', 'Anchorage', '99501', 'lpaprocki@hotmail.com', '773-573-6914');

-- Insert data into Invoices
INSERT INTO Invoices (gardenerID, totalCost) VALUES
(1, 120.00),
(2, 75.50),
(3, 150.25),
(4, 110.00),
(5, 90.50);

-- Insert data into Plants
INSERT INTO Plants (varietyName, type, price) VALUES
('RedRoses', 'Flower', 10.00),
('Tulips', 'Flower', 5.00),
('Carrots', 'Vegetable', 20.00),
('Squash', 'Vegetable', 6.50),
('Grapes', 'Fruit', 25.00);

-- Insert data into Plots
INSERT INTO Plots (gardenID) VALUES
(1),
(2),
(3),
(4),
(5);

-- Insert data into PlantsPlots
INSERT INTO PlantsPlots (plantID, plotID) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4);

-- Insert data into PlotsGardeners
INSERT INTO PlotsGardeners (plotID, gardenerID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);


-- Insert data into InvoiceDetails
INSERT INTO InvoiceDetails (plantID, invoiceID, price, quantity, lineTotal) VALUES
(1, 1, 10.00, 5, 50.00),
(2, 2, 5.00, 5, 25.00),
(3, 3, 20.00, 2, 40.00),
(4, 4, 6.50, 3, 19.50),
(5, 5, 25.00, 1, 25.00);


SET FOREIGN_KEY_CHECKS=1;
