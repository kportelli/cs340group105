// Citation for event handler on the 'change' event
// Date: 10 June 2024
// Adapted from the nodejs-starter-app, as well as the MDN documentation
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js
// Source URL: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

// get the selected plant
let plantInput = document.getElementById("input-invoice-details-plant");

// when a new option is selected, capture the value
plantInput.addEventListener("change", function() {
    let plantData = plantInput.value;

    // if the value is default, return
    if (plantData == "default-plant") {
        let priceInput = document.getElementById("input-invoice-details-price");
        priceInput.value = "";
        priceInput.readOnly = false;
        return;
    }

    // parse data into JSON object
    let parsedData = JSON.parse(decodeURI(plantData));
    
    // populate the price field with the price of the selected plant
    let priceInput = document.getElementById("input-invoice-details-price");
    priceInput.value = parsedData.price;
    priceInput.readOnly = true;
});