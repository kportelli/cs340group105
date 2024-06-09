// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

let addPlotGardenerForm = document.getElementById('add-plot-gardener-form-ajax');

// Modify the objects we need
addPlotGardenerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlotID = document.getElementById("input-add-plot-gardener-plot-id");
    let inputGardenerID = document.getElementById("input-add-plot-gardener-gardener-id");

    // Get the values from the form fields
    let plotIDValue = inputPlotID.value;
    let gardenerIDValue = inputGardenerID.value;

    // Put our data we want to send in a javascript object
    let data = {
        plotID: plotIDValue,
        gardenerID: gardenerIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plotgardener-ajax", true);
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


// Creates a single row from an Object representing a single record  
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("plotsgardeners-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let plotIDCell = document.createElement("TD");
    let gardenCell = document.createElement("TD");
    let gardenerCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plotsGardenersID;
    plotIDCell.innerText = newRow.plotID;
    gardenCell.innerText = `${newRow.gardenID} ${newRow.gardenName}`;
    gardenerCell.innerText = `${newRow.gardenerID} ${newRow.firstName} ${newRow.lastName}`;

    //insert delete button in new cell
    let deleteButton = document.createElement("button");
    deleteButton.onclick = function () {
        deletePlotGardener(newRow.plotsGardenersID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(plotIDCell);
    row.appendChild(gardenCell);
    row.appendChild(gardenerCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.plotsGardenersID);

    // Add the row to the table
    currentTable.appendChild(row);


    // reset select option to default
    var selectElement = document.getElementById("input-add-plot-gardener-plot-id");
    selectElement.selectedIndex = 0; // Reset to the first option

    // clear out form input fields
    selectElement = document.getElementById("input-add-plot-gardener-gardener-id");
    selectElement.selectedIndex = 0; // Reset to the first option
}