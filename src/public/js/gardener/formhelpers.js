// Citation for event handler on the 'change' event
// Date: 10 June 2024
// Adapted from the nodejs-starter-app, as well as the MDN documentation
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js
// Source URL: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

// Citation for decodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. Used to decode a string so it can then be parsed into an object.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

let gardenerInput = document.getElementById("input-update-gardener-id");

// This event listener captures the value of the selected entity 
// and then updates each field in the form with the data from the selected entity.
// This allows the user to take advantage of the existing data, and only update the fields they need to.
gardenerInput.addEventListener("change", function() {
    let gardenData = gardenerInput.value;
    gardenData = decodeURI(gardenData);

    // get the form fields
    let firstName = document.getElementById("input-update-gardener-first-name");
    let lastName = document.getElementById("input-update-gardener-last-name");
    let address = document.getElementById("input-update-gardener-streetAddress");
    let city = document.getElementById("input-update-gardener-city");
    let zip = document.getElementById("input-update-gardener-zipCode");
    let email = document.getElementById("input-update-gardener-email");
    let phone = document.getElementById("input-update-gardener-phone");

    // if the value is default, empty the form and return
    if (gardenData == "default-gardener") {
        
        firstName.value = "";
        address.value = "";
        city.value = "";
        zip.value = "";
        email.value = "";
        phone.value = "";
        return;
    }

    // parse data into JSON object
    let parsedData = JSON.parse(gardenData);

    // fill the form fields with the data
    firstName.value = parsedData.firstName;
    lastName.value = parsedData.lastName;
    address.value = parsedData.streetAddress;
    city.value = parsedData.city;
    zip.value = parsedData.zip;
    email.value = parsedData.email;
    phone.value = parsedData.phone;
});