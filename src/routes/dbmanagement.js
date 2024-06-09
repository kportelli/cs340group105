// Citation for the importing of dependencies using the require function
// Date: 10 June 2024
// Adapted from the nodejs api documentation. See [README] for more information on the use
//  of this pattern throughout this codebase.
// Source URL: https://nodejs.org/api/modules.html#requireid

// Citation for the use of the node exports module
// Date: 10 June 2024
// Adapted from the nodejs documentation. The documentation provides examples of
//  how to export functions from a module.
// Source URL: https://nodejs.org/api/modules.html#modules_modules
// Source URL: https://nodejs.org/docs/v20.13.1/api/modules.html#exports
// Source URL: https://www.geeksforgeeks.org/node-js-export-module/

// Citation for the use of the express.Router class
// Date: 10 June 2024
// Adapted from the express api documentation. See [README] for more information on the use
//  of this pattern throughout this codebase.
// Source URL: https://expressjs.com/en/4x/api.html#router
// Source URL: (link to our readme file/ citations)

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');
const { readSQL } = require('../helpers/sqlfilemanagement');

router.get('/db-management-reset', function (req, res) {
    // read the sql file into a string
    const query = readSQL();

    // execute the sql query with the admin pool which allows for multiple query statements
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