// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

let addInvoiceDetailForm = document.getElementById('add-invoice-details-form-ajax');

// Modify the objects we need
addInvoiceDetailForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    
    // Get form fields we need to get data from
    let inputPlantID = document.getElementById("input-invoice-details-plant");
    let inputInvoiceID = document.getElementById("input-invoice-details-invoice");
    let inputPlantPrice = document.getElementById("input-invoice-details-price");
    let inputPlantQuantity = document.getElementById("input-invoice-details-quantity");

    if (inputPlantID.value === "default") {
        alert("Please select a plant from the dropdown.");
        return;
    }

    if (inputInvoiceID.value === "default") {
        alert("Please select an invoice from the dropdown.");
        return;
    }

    // Get the values from the form fields
    // parse inputPlantID.value from string to object
    let plantIDValue = JSON.parse(decodeURI(inputPlantID.value)).plantID;
    let invoiceIDValue = inputInvoiceID.value;
    // parse price and quantity to numbers
    let priceValue = parseFloat(inputPlantPrice.value);
    let quantityValue = parseFloat(inputPlantQuantity.value);

    // Check if the values are valid
    if (plantIDValue == null || invoiceIDValue == null || priceValue == null || quantityValue == null) {
        return;
    }

    // check price and quantity are numbers
    if (isNaN(priceValue) || isNaN(quantityValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        plantID: plantIDValue,
        invoiceID: invoiceIDValue,
        price: priceValue,
        quantity: quantityValue,
        lineTotal: priceValue * quantityValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoicedetail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // set input back to default value
            // reset select option to default
            var selectElement = document.getElementById("input-invoice-details-plant");
            selectElement.selectedIndex = 0; // Reset to the first option

            // clear out form input fields
            selectElement = document.getElementById("input-invoice-details-invoice");
            selectElement.selectedIndex = 0; // Reset to the first option

            // Clear the input fields for another transaction\
            inputPlantPrice.value = '';
            inputPlantQuantity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoice-details-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and appropriate cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let invoiceCell = document.createElement("TD");
    let plantCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let lineTotalCell = document.createElement("TD");
    let gardenerCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceDetailID;
    invoiceCell.innerText = newRow.invoiceID;
    plantCell.innerText = `${newRow.plantID} ${newRow.varietyName} ${newRow.type}`;
    quantityCell.innerText = newRow.quantity;
    priceCell.innerText = '$' + parseFloat(newRow.price).toFixed(2);
    lineTotalCell.innerText = '$' + parseFloat(newRow.lineTotal).toFixed(2);
    gardenerCell.innerText = `${newRow.gardenerID} ${newRow.firstName} ${newRow.lastName}`;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(invoiceCell);
    row.appendChild(plantCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(lineTotalCell);
    row.appendChild(gardenerCell);

    row.setAttribute('data-value', newRow.invoiceDetailID);

    // Add the row to the table
    currentTable.appendChild(row);
}