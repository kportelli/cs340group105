// Get the objects we need to modify
let addGardenForm = document.getElementById('add-plant-form-ajax');

// Modify the objects we need
addGardenForm.addEventListener("submit", function (e) {

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


// Creates a single row from an Object representing a single record from 
// plants
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

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.plantID;
    varietyNameCell.innerText = newRow.varietyName;
    plantTypeCell.innerText = newRow.type;
    plantPriceCell.innerText = newRow.price;

    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() {
        deletePlant(newRow.plantID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // deleteCell.innerHTML = '<button onclick="deletePlant({{this.plantID}})">Delete</button>'
    // deleteCell.onclick
    // // deleteCell = document.createElement("button");
    // deleteCell.innerText = "Delete";
    // deleteCell.onclick = function(){
    //     deletePlant(newRow.id);
    // };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(varietyNameCell);
    row.appendChild(plantTypeCell);
    row.appendChild(plantPriceCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating plants

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-plantID");
    let option = document.createElement("option");
    option.text = newRow.plantID;
    option.value = newRow.plantID;
    selectMenu.add(option);
    // End of new step 8 code.
}