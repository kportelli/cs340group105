// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

let addPlantForm = document.getElementById('add-plant-form-ajax');

// Modify the objects we need
addPlantForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVarietyName = document.getElementById("input-varietyName");
    let inputPlantType = document.getElementById("input-plant-type");
    let inputPlantPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let varietyNameValue = inputVarietyName.value;
    let plantTypeValue = inputPlantType.value;
    let plantPriceValue = inputPlantPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        varietyName: varietyNameValue,
        type: plantTypeValue,
        price: plantPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVarietyName.value = '';
            inputPlantType.value = '';
            inputPlantPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from plants
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("plants-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let varietyNameCell = document.createElement("TD");
    let plantTypeCell = document.createElement("TD");
    let plantPriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plantID;
    varietyNameCell.innerText = newRow.varietyName;
    plantTypeCell.innerText = newRow.type;
    plantPriceCell.innerText = '$' + parseFloat(newRow.price).toFixed(2);

    // add delete button to new row
    let deleteButton = document.createElement("button");
    deleteButton.onclick = function () {
        deletePlant(newRow.plantID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(varietyNameCell);
    row.appendChild(plantTypeCell);
    row.appendChild(plantPriceCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.plantID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-plantID");
    let option = document.createElement("option");
    option.text = `${newRow.plantID} ${newRow.varietyName} ${newRow.type}`;
    option.value = newRow.plantID;
    selectMenu.add(option);
}