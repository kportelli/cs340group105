
// note: when a gardenerID is deleted, 
// referencing Invoice rows set gardenerID to NULL,
// referencing PlotsGardeners rows are also deleted via CASCADE

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

    let table = document.getElementById("gardeners-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == gardenerID) {
            table.deleteRow(i);
            break;
        }
    }
}