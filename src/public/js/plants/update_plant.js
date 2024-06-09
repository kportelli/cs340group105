// Citation for event handler on the 'submit' event for updating an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/update_person.js

let updateGardenForm = document.getElementById('update-plant-form-ajax');

// Modify the objects we need
updateGardenForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_plantID = document.getElementById("input-plantID");
    let input_price = document.getElementById("input-price-update");

    // Get the values from the form fields
    let plantIDvalue = input_plantID.value;
    let priceValue = input_price.value;

    // check the the input value for the new Price is valid
    if (isNaN(priceValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        plantID: plantIDvalue,
        price: priceValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, plantIDvalue);

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

    let table = document.getElementById("plants-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == plantID) {

            // Get the location of the row where we found the matching plant ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of price value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign price to our value we updated to
            td.innerHTML = parsedData[0].price;

            // reset select option to default
            var selectElement = document.getElementById("input-plantID");
            selectElement.selectedIndex = 0; // Reset to the first option

            // clear out form input fields
            document.getElementById("input-price-update").value = '';
        }
    }
}