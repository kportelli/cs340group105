// Get the objects we need to modify
let addInvoiceDetailForm = document.getElementById('add-invocie-details-form-ajax');

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

})


// Creates a single row from an Object representing a single record 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("plants-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let varietyNameCell = document.createElement("TD");
    let plantTypeCell = document.createElement("TD");
    let plantPriceCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plantID;
    varietyNameCell.innerText = newRow.varietyName;
    plantTypeCell.innerText = newRow.type;
    plantPriceCell.innerText = newRow.price;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(varietyNameCell);
    row.appendChild(plantTypeCell);
    row.appendChild(plantPriceCell);

    // Add the row to the table
    currentTable.appendChild(row);
}