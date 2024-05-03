# cs340group105
# Growing Our Community

## Create your database
In the MySQL command prompt, view your databases with `SHOW DATABASES;`. Then create a new database `GrowingOurCommunity` with the following command.
```
CREATE DATABASE GrowingOurCommunity;
```
View your newly created database with `SHOW DATABASES;`.

## Create Tables and Load Data
Use the `DDL.sql` file to create tables and load sample data into the database.
```
USE GrowingOurCommunity;
source ./DDL.sql;
```

## View Data
You can view the table architecture, and view the data from the table with the following commands.
```
DESCRIBE Gardens;
SELECT * FROM Gardens;
```
