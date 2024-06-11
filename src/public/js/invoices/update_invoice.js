// Citation for event handler on the 'submit' event for updating an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/update_person.js

let updateInvoiceForm = document.getElementById('update-invoice-form-ajax');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_gardenerID = document.getElementById("input-update-gardenerID-invoices");

    // Get the values from the form fields
    let gardenerIDValue = input_gardenerID.value;

    // check if the user has selected a plant to update
    if (gardenerIDValue == "default") {
        alert("Please select a gardener to remove.");
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        gardenerID: gardenerIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, gardenerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


function updateRow(data, plantID) {
    let parsedData = JSON.parse(data);

    let listOfChangedInvoiceIds = [];
    parsedData.forEach((e) => listOfChangedInvoiceIds.push(e.invoiceID));

    let table = document.getElementById("invoices-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop

        // get current invoiceId of the table row
        let invoiceID = table.rows[i].getAttribute("data-value");
        if (listOfChangedInvoiceIds.includes(parseInt(invoiceID))) {

            // Get the location of the row where we found the matching plant ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of gardener value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Check if the value is already updated
            if (td.innerText == '[Removed]') {
                continue;
            }

            // Reassign price to our value we updated to
            td.innerText = '[Removed]'

            // reset select option to default
            var selectElement = document.getElementById("input-update-gardenerID-invoices");
            selectElement.selectedIndex = 0; // Reset to the first option
        }
    }
}