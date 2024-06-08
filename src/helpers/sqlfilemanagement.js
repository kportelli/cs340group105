// Citation for the use of the node filesystem library 'fs'
// Date 10 June 2024
// Copied from the nodejs api documentation
// Source URL: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options

// Citation for the use of the node path library
// Date 10 June 2024
// Copied from the nodejs api documentation. This library is used to join file paths
//  in order to properly read the sql files.
// Source URL: https://nodejs.org/api/path.html#path_path_join_paths

const fs = require('fs');
const path = require('path');

// read the cleanup file and return the contents
const readCleanup = () => {
    const filePath = path.join(__dirname, '../database/cleanup.sql');
    return fs.readFileSync(filePath, 'utf8');
}

// read the DDL file and return the contents
const readDDL = () => {
    const filePath = path.join(__dirname, '../database/ddl.sql');
    return fs.readFileSync(filePath, 'utf8');
}

// concatenate the cleanup and DDL files and return the contents
const readSQL = () => {
    return readCleanup() + readDDL();
}

// export the readSQL function
module.exports = {
    readSQL: readSQL
};