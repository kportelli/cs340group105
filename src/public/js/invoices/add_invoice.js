// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGardenerID = document.getElementById("input-gardenerID-invoices");

    // Get the values from the form fields
    let gardenerIDValue = inputGardenerID.value;

    if (gardenerIDValue === "default") {
        alert("Please select a gardener from the dropdown.");
        return;
    }

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
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


// Creates a single row from an Object representing a single record from Invoices
addRowToTable = (data) => {

    // Get a reference to the current table on the page 
    let currentTable = document.getElementById("invoices-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let gardenerCell = document.createElement("TD");
    let totalCostCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceID;
    gardenerCell.innerText = `${newRow.gardenerID} ${newRow.firstName} ${newRow.lastName}`;
    totalCostCell.innerText = '$' + parseFloat(newRow.totalCost).toFixed(2);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(gardenerCell);
    row.appendChild(totalCostCell);
    
    row.setAttribute('data-value', newRow.invoiceID);

    // Add the row to the table
    currentTable.appendChild(row);

    // reset the dropdown to default
    let inputGardenerID = document.getElementById("input-gardenerID-invoices");
    inputGardenerID.selectedIndex = 0;
}