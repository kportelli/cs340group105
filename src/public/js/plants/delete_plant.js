function deletePlant(plantID) {

    // check that the plantID to be deleted is a valid number
    if (plantID == null || isNaN(plantID)) {
        return;
    }

    let data = { id: plantID };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(plantID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(plantID) {

    let table = document.getElementById("plants-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == plantID) {
            table.deleteRow(i);
            break;
        }
    }

    // remove plant from update select options
    let updatePlantSelect = document.getElementById("input-plantID");
    for (let i = 0, option; option = updatePlantSelect.options[i]; i++) {
        if (option.value == plantID) {
            updatePlantSelect.remove(i);
            break;
        }
    }
}