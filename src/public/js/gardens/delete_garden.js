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
        if (option.value == gardenID) {
            updateGardenSelect.remove(i);
            break;
        }
    }
}