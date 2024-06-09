// Citation for event handler on the 'submit' event for adding an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js

// Citation for encodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. This is used in order to handle special characters in the code. By encoding
//  a stringified object whose properties are explicitly defined by the user, we are able to handle all sorts of special 
//  characters, including ', ", and ` which were extremely problematic.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI

let addGardenForm = document.getElementById('add-garden-form-ajax');

// add event listener for the submit event
addGardenForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-add-garden-name");
    let inputAddress = document.getElementById("input-add-garden-streetAddress");
    let inputCity = document.getElementById("input-add-garden-city");
    let inputZip = document.getElementById("input-add-garden-zipCode");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let zipValue = inputZip.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        address: addressValue,
        city: cityValue,
        zip: zipValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-garden-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputZip.value = '';
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
    let currentTable = document.getElementById("gardens-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let zipCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.gardenID;
    nameCell.innerText = newRow.gardenName;
    addressCell.innerText = newRow.streetAddress;
    cityCell.innerText = newRow.city;
    zipCell.innerText = newRow.zip;

    let deleteButton = document.createElement("button");
    deleteButton.onclick = function() {
        deleteGarden(newRow.gardenID);
    };
    deleteButton.innerText = "Delete";
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(cityCell);
    row.appendChild(zipCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.gardenID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-update-garden-id");
    let option = document.createElement("option");
    option.text = `${newRow.gardenID} ${newRow.gardenName}`;
    option.value = encodeURI(JSON.stringify({ID: newRow.gardenID,
                                            Name: newRow.gardenName,
                                            Address: newRow.streetAddress,
                                            City: newRow.city,
                                            Zip: newRow.zip
    }));
    selectMenu.add(option);
}