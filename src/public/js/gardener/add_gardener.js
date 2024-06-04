// Get the objects we need to modify
let addGardenerForm = document.getElementById('add-gardener-form-ajax');

// Modify the objects we need
addGardenerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputAddressGardener = document.getElementById("input-address-gardener");
    let inputCityGardener = document.getElementById("input-city-gardener");
    let inputZipGardener = document.getElementById("input-zip-gardener");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let addressGardenerValue = inputAddressGardener.value;
    let cityGardenerValue = inputCityGardener.value;
    let zipGardenerValue = inputZipGardener.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;


    // Put our data we want to send in a javascript object
    let data = {
        fname: firstNameValue,
        lname: lastNameValue,
        address_gardener: addressGardenerValue,
        city_gardener: cityGardenerValue,
        zip_gardener: zipGardenerValue,
        email: emailValue,
        phone: phoneValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-gardener-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputAddressGardener.value = '';
            inputCityGardener.value = '';
            inputZipGardener.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
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
    let currentTable = document.getElementById("gardeners-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let addressGardenerCell = document.createElement("TD");
    let cityGardenerCell = document.createElement("TD");
    let zipGardenerCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.gardenerID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    addressGardenerCell.innerText = newRow.streetAddress;
    cityGardenerCell.innerText = newRow.city;
    zipGardenerCell.innerText = newRow.zip;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;

    // Add a delete button to the new row
    let deleteButton = document.createElement("button");
    deleteButton.onclick = function () {
        deleteGardener(newRow.gardenerID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(addressGardenerCell);
    row.appendChild(cityGardenerCell);
    row.appendChild(zipGardenerCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.gardenerID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.fname + ' ' + newRow.lname;
    option.value = newRow.gardenerID;
    selectMenu.add(option);
    // End of new step 8 code.
}