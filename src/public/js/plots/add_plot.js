// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

let addPlotForm = document.getElementById('add-plot-form-ajax');

// Modify the objects we need
addPlotForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let gardenID = document.getElementById("input-add-plot-garden-id");

    // Get the values from the form fields
    let gardenIDValue = gardenID.value;

    if (gardenIDValue === "default") {
        alert("Please select a garden from the dropdown.");
        return;
    }
    
    // Put our data we want to send in a javascript object
    let data = {
        gardenID: gardenIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plot-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Creates a single row from an Object representing a single record from 
// plants
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("plots-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let gardenCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plotID;
    gardenCell.innerText = `${newRow.gardenID} ${newRow.gardenName}`;

    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() {
        deletePlot(newRow.plotID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(gardenCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.plotID);

    // Add the row to the table
    currentTable.appendChild(row);

    // reset select option to default
    let addPlotSelect = document.getElementById("input-add-plot-garden-id");
    addPlotSelect.selectedIndex = 0;
}