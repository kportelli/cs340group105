// get the selected plantID
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
    let parsedData = JSON.parse(plantData);

    let price = parsedData.price;
    let plantID = parsedData.plantID;

    // populate the price field with the price of the selected plant
    let priceInput = document.getElementById("input-invoice-details-price");
    priceInput.value = price;
    priceInput.readOnly = true;

    // Get the plant details
    // getPlantDetails(plantID, plantName);
});