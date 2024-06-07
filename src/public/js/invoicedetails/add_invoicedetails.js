// Get the objects we need to modify
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

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let invoiceIDCell = document.createElement("TD");
    let varietyNameCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let lineTotalCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");

    //let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceDetailID;
    invoiceIDCell.innerText = newRow.invoiceID;
    varietyNameCell.innerText = newRow.varietyName;
    typeCell.innerText = newRow.type;
    quantityCell.innerText = newRow.quantity;
    priceCell.innerText = newRow.price;
    lineTotalCell.innerText = newRow.lineTotal;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;

    ///let deleteButton = document.createElement("button");
    // deleteButton.onclick = function () {
    //deleteInvoiceDetail(newRow.invoiceDetailID);
    //};
    //deleteButton.innerText = "Delete";
    //deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(invoiceIDCell);
    row.appendChild(varietyNameCell);
    row.appendChild(typeCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(lineTotalCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    //row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.invoiceDetailID);

    // Add the row to the table
    currentTable.appendChild(row);
}