// get the selected plantID
let gardenInput = document.getElementById("input-update-garden-id");

// when a new option is selected, capture the value
gardenInput.addEventListener("change", function() {
    let gardenData = gardenInput.value;

    // if ` exists in gardenData, remove it
    gardenData = gardenData.replace(/`/g, '');

    let gardenName = document.getElementById("input-update-garden-name");
    let gardenAddress = document.getElementById("input-update-garden-streetAddress");
    let gardenCity = document.getElementById("input-update-garden-city");
    let gardenZip = document.getElementById("input-update-garden-zipCode");

    // if the value is default, return
    if (gardenData == "default-garden") {
        
        gardenName.value = "";
        gardenAddress.value = "";
        gardenCity.value = "";
        gardenZip.value = "";

        return;
    }

    // parse data into JSON object
    let parsedData = JSON.parse(gardenData);

    gardenName.value = parsedData.Name;
    gardenAddress.value = parsedData.Address;
    gardenCity.value = parsedData.City;
    gardenZip.value = parsedData.Zip;
});