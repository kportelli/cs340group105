// Citation for delete functionality
// Date: 10 June 2024
// Adapted from the nodejs-starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/delete_person.js

// Citation for decodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. Used to decode a string so it can then be parsed into an object.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

function deleteGardener(gardenerID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: gardenerID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-gardener-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(gardenerID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(gardenerID) {

    // get the gardeners table
    let table = document.getElementById("gardeners-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == gardenerID) {
            // if we find the row, delete it from the table and break out of the loop
            table.deleteRow(i);
            break;
        }
    }

    // remove gardener from update gardener select options
    let updateGardenerSelect = document.getElementById("input-update-gardener-id");
    for (let i = 0, option; option = updateGardenerSelect.options[i]; i++) {
        let value = decodeURI(option.value);
        if (value == "default") {
            continue;
        }
        if (JSON.parse(value).gardenerID == gardenerID) {

            // if the deleted gardener is the one selected in the "update gardener" form, reset the form
            let inputGardenerID = document.getElementById("input-update-gardener-id");

            if (decodeURI(inputGardenerID.value) != "default" && 
            JSON.parse(decodeURI(inputGardenerID.value)).gardenerID == gardenerID) {

                // clear the input fields
                let inputFirstName = document.getElementById("input-update-gardener-first-name");
                let inputLastName = document.getElementById("input-update-gardener-last-name");
                let inputAddress = document.getElementById("input-update-gardener-streetAddress");
                let inputCity = document.getElementById("input-update-gardener-city");
                let inputZip = document.getElementById("input-update-gardener-zipCode");
                let inputEmail = document.getElementById("input-update-gardener-email");
                let inputPhone = document.getElementById("input-update-gardener-phone");

                inputFirstName.value = '';
                inputLastName.value = '';
                inputAddress.value = '';
                inputCity.value = '';
                inputZip.value = '';
                inputEmail.value = '';
                inputPhone.value = '';
            }
            updateGardenerSelect.selectedIndex = 0; // Reset to the first option

            // remove the gardener from the select options
            updateGardenerSelect.remove(i);
            break;
        }
    }
}