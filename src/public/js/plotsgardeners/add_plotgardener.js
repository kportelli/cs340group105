// Get the objects we need to modify
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

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("plotsgardeners-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let plotIDCell = document.createElement("TD");
    let gardenIDCell = document.createElement("TD");
    let gardenerIDCell = document.createElement("TD");
    let gardenNameCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plotsGardenersID;
    plotIDCell.innerText = newRow.plotID;
    gardenIDCell.innerText = newRow.gardenID;
    gardenerIDCell.innerText = newRow.gardenerID;
    gardenNameCell.innerText = newRow.gardenName;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;

    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() {
        deletePlotGardener(newRow.plotsGardenersID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(plotIDCell);
    row.appendChild(gardenIDCell);
    row.appendChild(gardenerIDCell);
    row.appendChild(gardenNameCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
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