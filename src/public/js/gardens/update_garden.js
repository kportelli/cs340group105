// Citation for event handler on the 'submit' event for updating an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/update_person.js

// Citation for decodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. Used to decode a string so it can then be parsed into an object.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

let updateGardenForm = document.getElementById('update-garden-form-ajax');

// Modify the objects we need
updateGardenForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_gardenID = document.getElementById("input-update-garden-id");
    let input_name = document.getElementById("input-update-garden-name");
    let input_address = document.getElementById("input-update-garden-streetAddress");
    let input_city = document.getElementById("input-update-garden-city");
    let input_zip = document.getElementById("input-update-garden-zipCode");

    // Get the values from the form fields
    let gardenIDvalue = JSON.parse(decodeURI(input_gardenID.value)).ID;

    // in case the user tries to submit a non-integer value (default)
    if (isNaN(gardenIDvalue)) {
        // empty the input fields
        input_name.value = '';
        input_address.value = '';
        input_city.value = '';
        input_zip.value = '';
        return;
    }

    let nameValue = input_name.value;
    let addressValue = input_address.value;
    let cityValue = input_city.value;
    let zipValue = input_zip.value;

    // Put our data we want to send in a javascript object
    let data = {
        gardenID: gardenIDvalue,
        gardenName: nameValue,
        streetAddress: addressValue,
        city: cityValue,
        zip: zipValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-garden-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, gardenIDvalue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


function updateRow(data, gardenID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("gardens-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == gardenID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdAddress = updateRowIndex.getElementsByTagName("td")[2];
            let tdCity = updateRowIndex.getElementsByTagName("td")[3];
            let tdZip = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            tdName.innerHTML = parsedData[0].gardenName;
            tdAddress.innerHTML = parsedData[0].streetAddress;
            tdCity.innerHTML = parsedData[0].city;
            tdZip.innerHTML = parsedData[0].zip;
        }
    }

    // update garden in update garden select options
    let updateGardenSelect = document.getElementById("input-update-garden-id");
    for (let i = 0, option; option = updateGardenSelect.options[i]; i++) {
        if (option.value == "default-garden") {
            continue;
        }
        if (JSON.parse(decodeURI(option.value)).ID == gardenID) {
            option.text = `${parsedData[0].gardenID} ${parsedData[0].gardenName}`;
            break;
        }
    }

    // reset select option to default
    var selectElement = document.getElementById("input-update-garden-id");
    selectElement.selectedIndex = 0; // Reset to the first option

    // reset form input fields
    document.getElementById("input-update-garden-name").value = '';
    document.getElementById("input-update-garden-streetAddress").value = '';
    document.getElementById("input-update-garden-city").value = '';
    document.getElementById("input-update-garden-zipCode").value = '';
}