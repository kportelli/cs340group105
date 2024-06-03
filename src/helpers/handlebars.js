// convert an object to a json string
module.exports = {
    json: function(context) {
        return JSON.stringify(context);
    },
    toFixed: function(value, decimals) {
        return parseFloat(value).toFixed(decimals);
    }
};