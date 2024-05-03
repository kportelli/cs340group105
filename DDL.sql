-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2024 at 07:22 PM
-- Server version: 10.6.17-MariaDB-log
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Gardeners;
DROP TABLE IF EXISTS Gardens;
DROP TABLE IF EXISTS InvoiceDetails;
DROP TABLE IF EXISTS Invoices;
DROP TABLE IF EXISTS PlantsPlots;
DROP TABLE IF EXISTS Plants;
DROP TABLE IF EXISTS Plots;
DROP TABLE IF EXISTS PlotsGardeners;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_portellk`
--

-- --------------------------------------------------------

--
-- Table structure for table `Gardeners`
--

CREATE TABLE `Gardeners` (
  `gardenerID` int(11) NOT NULL,
  `firstName` varchar(145) NOT NULL,
  `lastName` varchar(145) NOT NULL,
  `streetAddress` varchar(145) NOT NULL,
  `city` varchar(145) NOT NULL,
  `zip` varchar(45) NOT NULL,
  `email` varchar(145) NOT NULL,
  `phone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gardens`
--

CREATE TABLE `Gardens` (
  `gardenID` int(11) NOT NULL,
  `gardenName` varchar(145) NOT NULL,
  `streetAddress` varchar(145) NOT NULL,
  `city` varchar(145) NOT NULL,
  `zip` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `InvoiceDetails`
--

CREATE TABLE `InvoiceDetails` (
  `invoiceDetailID` int(11) NOT NULL,
  `plantID` int(11) NOT NULL,
  `invoiceID` int(11) NOT NULL,
  `gardenerID` int(11) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `lineTotal` decimal(19,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL,
  `gardenerID` int(11) NOT NULL,
  `totalCost` decimal(19,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Plants`
--

CREATE TABLE `Plants` (
  `plantID` int(11) NOT NULL,
  `varietyName` varchar(145) NOT NULL,
  `type` varchar(145) NOT NULL,
  `price` decimal(19,2) DEFAULT NULL COMMENT 'An inventory of individual plants. '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PlantsPlots`
--

CREATE TABLE `PlantsPlots` (
  `plantsPlotsID` int(11) NOT NULL,
  `plantID` int(11) NOT NULL,
  `plotID` int(11) NOT NULL,
  `gardenID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Plots`
--

CREATE TABLE `Plots` (
  `plotID` int(11) NOT NULL,
  `gardenID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PlotsGardeners`
--

CREATE TABLE `PlotsGardeners` (
  `plotID` int(11) NOT NULL,
  `gardenID` int(11) NOT NULL,
  `gardenerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Gardeners`
--
ALTER TABLE `Gardeners`
  ADD PRIMARY KEY (`gardenerID`);

--
-- Indexes for table `Gardens`
--
ALTER TABLE `Gardens`
  ADD PRIMARY KEY (`gardenID`);

--
-- Indexes for table `InvoiceDetails`
--
ALTER TABLE `InvoiceDetails`
  ADD PRIMARY KEY (`invoiceDetailID`,`invoiceID`,`gardenerID`,`plantID`),
  ADD KEY `fk_InvoiceDetails_Plants1_idx` (`plantID`),
  ADD KEY `fk_InvoiceDetails_Invoices1_idx` (`invoiceID`,`gardenerID`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`invoiceID`,`gardenerID`),
  ADD KEY `fk_Invoices_Gardeners1_idx` (`gardenerID`);

--
-- Indexes for table `Plants`
--
ALTER TABLE `Plants`
  ADD PRIMARY KEY (`plantID`);

--
-- Indexes for table `PlantsPlots`
--
ALTER TABLE `PlantsPlots`
  ADD PRIMARY KEY (`plantsPlotsID`,`plantID`,`plotID`,`gardenID`),
  ADD KEY `fk_plantsPlots_Plants1_idx` (`plantID`),
  ADD KEY `fk_plantsPlots_Plots1_idx` (`plotID`,`gardenID`);

--
-- Indexes for table `Plots`
--
ALTER TABLE `Plots`
  ADD PRIMARY KEY (`plotID`,`gardenID`),
  ADD KEY `fk_Plots_Gardens1_idx` (`gardenID`);

--
-- Indexes for table `PlotsGardeners`
--
ALTER TABLE `PlotsGardeners`
  ADD PRIMARY KEY (`plotID`,`gardenID`,`gardenerID`),
  ADD KEY `fk_PlotsGardeners_Gardeners1_idx` (`gardenerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PlantsPlots`
--
ALTER TABLE `Gardeners`
  MODIFY `gardenerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Gardeners`
--
ALTER TABLE `Gardeners`
  MODIFY `gardenerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Gardens`
--
ALTER TABLE `Gardens`
  MODIFY `gardenID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `InvoiceDetails`
--
ALTER TABLE `InvoiceDetails`
  MODIFY `invoiceDetailID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `invoiceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Plants`
--
ALTER TABLE `Plants`
  MODIFY `plantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Plots`
--
ALTER TABLE `Plots`
  MODIFY `plotID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PlantsPlots`
--
ALTER TABLE `PlantsPlots`
    MODIFY `plantsPlotsID` int (11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `InvoiceDetails`
--
ALTER TABLE `InvoiceDetails`
  ADD CONSTRAINT `fk_InvoiceDetails_Invoices1` FOREIGN KEY (`invoiceID`,`gardenerID`) REFERENCES `Invoices` (`invoiceID`, `gardenerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_InvoiceDetails_Plants1` FOREIGN KEY (`plantID`) REFERENCES `Plants` (`plantID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `fk_Invoices_Gardeners1` FOREIGN KEY (`gardenerID`) REFERENCES `Gardeners` (`gardenerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PlantsPlots`
--
ALTER TABLE `PlantsPlots`
  ADD CONSTRAINT `fk_plantsPlots_Plants1` FOREIGN KEY (`plantID`) REFERENCES `Plants` (`plantID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_plantsPlots_Plots1` FOREIGN KEY (`plotID`, `gardenID`) REFERENCES `Plots` (`plotID`, `gardenID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Plots`
--
ALTER TABLE `Plots`
  ADD CONSTRAINT `fk_Plots_Gardens1` FOREIGN KEY (`gardenID`) REFERENCES `Gardens` (`gardenID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PlotsGardeners`
--
ALTER TABLE `PlotsGardeners`
  ADD CONSTRAINT `fk_PlotsGardeners_Gardeners1` FOREIGN KEY (`gardenerID`) REFERENCES `Gardeners` (`gardenerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_PlotsGardeners_Plots1` FOREIGN KEY (`plotID`) REFERENCES `Plots` (`plotID`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*
Seed database
*/
-- Insert data into Gardeners
INSERT INTO Gardeners (firstName, lastName, streetAddress, city, zip, email, phone) VALUES
('Joe', 'Schmoe', '555 W Lake Dr.', 'Portland', '97123', 'joe.schmoe@email.com', '504-621-8927'),
('Alice', 'Smith', '234 Elm St.', 'Aurora', '80015', 'alice.smith@email.com', '810-292-9388'),
('Carol', 'White', '135 Birch St.', 'Aurora', '80016', 'carol.white@email.com', '856-636-8749'),
('Josephine', 'Darakjy', '4 B Blue Ridge Blvd', 'Brighton', '48116', 'josephine_darakjy@darakjy.org', '513-570-1893'),
('Art', 'Venere', '8 W Cerritos Ave #54', 'Bridgeport', '80145', 'art@venere.org', '419-503-2484'),
('Lenna', 'Paprocki', '639 Main St', 'Anchorage', '99501', 'lpaprocki@hotmail.com', '773-573-6914');

-- Insert data into Gardens
INSERT INTO Gardens (gardenName, streetAddress, city, zip) VALUES
('New Beginnings', '456 E Forest St.', 'Portland', '97086'),
('Dirt Patch', '10 S Desert Pkwy.', 'Denver', '80123'),
('Icy Valley', '123 Glacier Highway', 'Juneau', '99801'),
('Oldtown Acres', '246 Cedar Street', 'Lansing', '48901'),
('Senior Village', '100 Methusalah Way', 'Palm Springs', '92240');

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
INSERT INTO PlantsPlots (plantID, plotID, gardenID) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 2, 2),
(4, 3, 3),
(5, 4, 4);

-- Insert data into PlotsGardeners
INSERT INTO PlotsGardeners (plotID, gardenID, gardenerID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

-- Insert data into InvoiceDetails
INSERT INTO InvoiceDetails (plantID, invoiceID, gardenerID, price, quantity, lineTotal) VALUES
(1, 1, 1, 10.00, 5, 50.00),
(2, 2, 2, 5.00, 5, 25.00),
(3, 3, 3, 20.00, 2, 40.00),
(4, 4, 4, 6.50, 3, 19.50),
(5, 5, 5, 25.00, 1, 25.00);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;