function deleteGarden(gardenID) {
    // Put our data we want to send in a javascript object
    let data = { id: gardenID };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-garden-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(gardenID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(gardenID) {

    let table = document.getElementById("gardens-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == gardenID) {
            table.deleteRow(i);
            break;
        }
    }

    // remove garden from update garden select options
    let updateGardenSelect = document.getElementById("input-update-garden-id");
    for (let i = 0, option; option = updateGardenSelect.options[i]; i++) {
        let value = decodeURI(option.value);
        if (decodeURI(value) == "default-garden") {
            continue;
        }
        if (JSON.parse(value).ID == gardenID) {

            // if the deleted garden is the one selected in the "update garden" form, reset the form
            let inputGardenID = document.getElementById("input-update-garden-id");

            if (decodeURI(inputGardenID.value) != "default-garden" && 
            JSON.parse(decodeURI(inputGardenID.value)).ID == gardenID) {

                // clear the input fields
                let inputName = document.getElementById("input-update-garden-name");
                let inputAddress = document.getElementById("input-update-garden-streetAddress");
                let inputCity = document.getElementById("input-update-garden-city");
                let inputZip = document.getElementById("input-update-garden-zipCode");

                inputName.value = '';
                inputAddress.value = '';
                inputCity.value = '';
                inputZip.value = '';
                inputGardenID.value = '';

                // reset select option to default
                var selectElement = document.getElementById("input-update-garden-id");
                selectElement.selectedIndex = 0; // Reset to the first option
            }

            // remove the garden from the select options
            updateGardenSelect.remove(i);
            break;
        }
    }
}