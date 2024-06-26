// Citation for delete functionality
// Date: 10 June 2024
// Adapted from the nodejs-starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/delete_person.js

function deletePlotGardener(plotsGardenersID) {
    // Put our data we want to send in a javascript object
    let data = { plotsGardenersID: plotsGardenersID };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-plotgardener-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(plotsGardenersID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(ID) {

    let table = document.getElementById("plotsgardeners-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == ID) {
            table.deleteRow(i);
            break;
        }
    }
}