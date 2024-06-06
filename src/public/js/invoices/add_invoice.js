// Get the objects we need to modify
let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGardenerID = document.getElementById("input-gardenerID-invoices");

    // Get the values from the form fields
    let gardenerIDValue = inputGardenerID.value;

    // Put our data we want to send in a javascript object
    let data = {
        gardenerID: gardenerIDValue,
        totalCost: "0"
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGardenerID.value = '';

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
    let currentTable = document.getElementById("invoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let gardenerIDCell = document.createElement("TD");
    let totalCostCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceID;
    gardenerIDCell.innerText = newRow.gardenerID;
    totalCostCell.innerText = newRow.totalCost;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(gardenerIDCell);
    row.appendChild(totalCostCell);

    row.setAttribute('data-value', newRow.invoiceID);

    // Add the row to the table
    currentTable.appendChild(row);

}