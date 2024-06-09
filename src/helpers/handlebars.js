// Citation for handlebars helpers
// Date: 10 June 2024
// Adapted from the Handlebars Helpers documentation. The documentation provides examples of 
//  how to create custom handlebars helpers. The helpers are then exported using the 
// node exports module, also linked below.
// Source URL: https://handlebarsjs.com/api-reference/helpers.html#helpers'

// Citation for the use of the node exports module
// Date: 10 June 2024
// Adapted from the nodejs documentation. The documentation provides examples of
//  how to export functions from a module.
// Source URL: https://nodejs.org/api/modules.html#modules_modules
// Source URL: https://nodejs.org/docs/v20.13.1/api/modules.html#exports
// Source URL: https://www.geeksforgeeks.org/node-js-export-module/

// Citation for encodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. This is used in order to handle special characters in the code. By encoding
//  a stringified object whose properties are explicitly defined by the user, we are able to handle all sorts of special 
//  characters, including ', ", and ` which were extremely problematic.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI

module.exports = {
    json: function(context) {
        return encodeURI(JSON.stringify(context));
    },
    toFixed: function(value, decimals) {
        return parseFloat(value).toFixed(decimals);
    }
};