// Citation for decodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. Used to decode a string so it can then be parsed into an object.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

// Citation for event handler on the 'change' event
// Date: 10 June 2024
// Adapted from the nodejs-starter-app, as well as the MDN documentation
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js
// Source URL: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

// get the select element for the garden on the update form
let gardenInput = document.getElementById("input-update-garden-id");

// This event listener captures the value of the selected entity 
// and then updates each field in the form with the data from the selected entity.
// This allows the user to take advantage of the existing data, and only update the fields they need to.
gardenInput.addEventListener("change", function() {
    let gardenData = gardenInput.value;
    gardenData = decodeURI(gardenData);

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