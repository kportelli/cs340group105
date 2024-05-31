// Get the objects we need to modify
let updateGardenForm = document.getElementById('update-garden-form-ajax');

// This code below is an attempt to populate the form fields with the data from the selected option...
// more work is needed to get this to work.
// // Get the select element
// let selectGardenID = document.getElementById("input-update-garden-id");

// // Add event listener for change event
// selectGardenID.addEventListener("change", function () {
//     // Get the selected option
//     let selectedOption = this.options[this.selectedIndex];

//     // Get the other input elements
//     let input_name = document.getElementById("input-update-garden-name");
//     let input_address = document.getElementById("input-update-garden-streetAddress");
//     let input_city = document.getElementById("input-update-garden-city");
//     let input_zip = document.getElementById("input-update-garden-zipCode");

//     // Assuming the selected option's value is an object with properties matching the other input elements
//     // You may need to adjust this based on the actual structure of your option value
//     input_name.value = selectedOption.value.gardenName;
//     input_address.value = selectedOption.value.streetAddress;
//     input_city.value = selectedOption.value.city;
//     input_zip.value = selectedOption.value.zip;
// });

// Modify the objects we need
updateGardenForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_gardenID = document.getElementById("input-update-garden-id");
    let input_name = document.getElementById("input-update-garden-name");
    let input_address = document.getElementById("input-update-garden-streetAddress");
    let input_city = document.getElementById("input-update-garden-city");
    let input_zip = document.getElementById("input-update-garden-zipCode");

    // Get the values from the form fields
    let gardenIDvalue = input_gardenID.value;
    let nameValue = input_name.value;
    let addressValue = input_address.value;
    let cityValue = input_city.value;
    let zipValue = input_zip.value;

    // Put our data we want to send in a javascript object
    let data = {
        gardenID: gardenIDvalue,
        gardenName: nameValue,
        streetAddress: addressValue,
        city: cityValue,
        zip: zipValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-garden-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, gardenIDvalue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, gardenID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("gardens-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == gardenID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdAddress = updateRowIndex.getElementsByTagName("td")[2];
            let tdCity = updateRowIndex.getElementsByTagName("td")[3];
            let tdZip = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            tdName.innerHTML = parsedData[0].gardenName;
            tdAddress.innerHTML = parsedData[0].streetAddress;
            tdCity.innerHTML = parsedData[0].city;
            tdZip.innerHTML = parsedData[0].zip;
        }
    }
}