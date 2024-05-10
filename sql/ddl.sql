-- These are database manipulation queries for the Growing Our Community database

-- Gardens
-- -- -- add a new garden into `gardens` table
INSERT INTO gardens (gardenName, streetAddress, city, zip) VALUES (:gardenName, :streetAddress, :city, :zip)

-- -- -- get all gardens
SELECT gardenID, gardenName, streetAddress, city, zip FROM gardens

-- -- -- get all plots in a garden
SELECT * FROM plots WHERE gardenID = :gardenID

-- -- -- update a garden's attributes based on provided gardenID
UPDATE gardens SET gardenName = :gardenName, streetAddress = :streetAddress, city = :city, zip = :zip WHERE gardenID = :gardenID

-- -- -- delete a garden based on provided gardenID (and cascade delete all plots in the garden)
DELETE FROM gardens WHERE gardenID = :gardenID

-- Plots
