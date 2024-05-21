function deletePlant(plantID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: plantID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        // We check for a xhttp status of 204 since that is what our delete route will be sending back to the front-end. 
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // A HTTP 204 No Content is a success status that indicates a request has succeeded, but the client doesn't need any further information

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


function deleteRow(plantID){

    let table = document.getElementById("plants-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == plantID) {
            table.deleteRow(i);
            break;
       }
    }
}