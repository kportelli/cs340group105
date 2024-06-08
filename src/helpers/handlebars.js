// Citation for handlebars helpers
// Date: 10 June 2024
// Adapted from the Handlebars Helpers documentation. The documentation provides examples of 
//  how to create custom handlebars helpers. The helpers are then exported using the
//  widely accepted and understood module.exports pattern.
// Source URL: https://handlebarsjs.com/api-reference/helpers.html#helpers

module.exports = {
    json: function(context) {
        return encodeURI(JSON.stringify(context));
    },
    toFixed: function(value, decimals) {
        return parseFloat(value).toFixed(decimals);
    }
};