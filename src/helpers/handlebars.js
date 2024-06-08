// Citation for handlebars helpers
// Date: 10 June 2024
// Adapted from the Handlebars Helpers documentation. The documentation provides examples of 
//  how to create custom handlebars helpers. The helpers are then exported using the 
// node exports module, also linked below.
// Source URL: https://handlebarsjs.com/api-reference/helpers.html#helpers'
// Source URL: https://nodejs.org/docs/v20.13.1/api/modules.html#exports
// Source URL: https://www.geeksforgeeks.org/node-js-export-module/

module.exports = {
    json: function(context) {
        return encodeURI(JSON.stringify(context));
    },
    toFixed: function(value, decimals) {
        return parseFloat(value).toFixed(decimals);
    }
};