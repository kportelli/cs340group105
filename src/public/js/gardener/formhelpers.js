// get the selected plantID
let gardenerInput = document.getElementById("input-update-gardener-id");

// when a new option is selected, capture the value
gardenerInput.addEventListener("change", function() {
    let gardenData = gardenerInput.value;
    gardenData = decodeURI(gardenData);

    let firstName = document.getElementById("input-update-gardener-first-name");
    let lastName = document.getElementById("input-update-gardener-last-name");
    let address = document.getElementById("input-update-gardener-streetAddress");
    let city = document.getElementById("input-update-gardener-city");
    let zip = document.getElementById("input-update-gardener-zipCode");
    let email = document.getElementById("input-update-gardener-email");
    let phone = document.getElementById("input-update-gardener-phone");

    // if the value is default, return
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

    firstName.value = parsedData.firstName;
    lastName.value = parsedData.lastName;
    address.value = parsedData.streetAddress;
    city.value = parsedData.city;
    zip.value = parsedData.zip;
    email.value = parsedData.email;
    phone.value = parsedData.phone;
});