const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');
const fs = require('fs');
const path = require('path');

const readCleanup = () => {
    const path = require('path');
    const filePath = path.join(__dirname, '../database/cleanup.sql');
    return fs.readFileSync(filePath, 'utf8');
}

const readDDL = () => {
    const path = require('path');
    const filePath = path.join(__dirname, '../database/ddl.sql');
    return fs.readFileSync(filePath, 'utf8');
}

const readSQL = () => {
    return readCleanup() + readDDL();
}

router.get('/db-management-reset', function (req, res) {

    const ddlPath = path.join(__dirname, '../database/ddl.sql');
    const cleanupPath = path.join(__dirname, '../database/cleanup.sql');
    const paths = [cleanupPath, ddlPath];
    const query = readSQL();
    db.adminpool.query(query, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(500).send('Error resetting database');
        }
        else {
            console.log('Database reset');
            res.status(200).send('Database reset');
        }
    });
});

module.exports = router;