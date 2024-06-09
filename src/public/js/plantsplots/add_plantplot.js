// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

let addPlantPlotForm = document.getElementById('add-plantplot-form-ajax');

// Modify the objects we need
addPlantPlotForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let plotID = document.getElementById("add-plants-plots-plot-id");
    let plantID = document.getElementById("add-plants-plots-plant-id");

    // Get the values from the form fields
    let plotIDValue = plotID.value;
    let plantIDValue = plantID.value;

    // Put our data we want to send in a javascript object
    let data = {
        plotID: plotIDValue,
        plantID: plantIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plantplot-ajax", true);
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
    let currentTable = document.getElementById("plantsplots-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let plotCell = document.createElement("TD");
    let plantCell = document.createElement("TD");
    let gardenCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plantsPlotsID;
    plotCell.innerText = newRow.plotID;
    plantCell.innerText = `${newRow.plantID} ${newRow.varietyName} ${newRow.type}`;
    gardenCell.innerText = `${newRow.gardenID} ${newRow.gardenName}`;
    
    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() {
        deletePlantPlot(newRow.plantsPlotsID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(plotCell);
    row.appendChild(plantCell);
    row.appendChild(gardenCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.plantsPlotsID);

    // Add the row to the table
    currentTable.appendChild(row);

    // clear the input fields
    let plotID = document.getElementById("add-plants-plots-plot-id");
    let plantID = document.getElementById("add-plants-plots-plant-id");
    plotID.selectedIndex = 0;
    plantID.selectedIndex = 0;

    // add new plant to update plant select options
    let updatePlantPlotSelect = document.getElementById("update-plants-plots-plantsplots-id");
    let option = document.createElement("option");
    option.value = JSON.stringify(newRow);
    option.text = `${newRow.plantsPlotsID} (${newRow.plantID} ${newRow.varietyName} ${newRow.type}) (${newRow.gardenID} ${newRow.gardenName})`;
    updatePlantPlotSelect.add(option);

}