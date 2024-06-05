// Get the objects we need to modify
let updateGardenerForm = document.getElementById('update-gardener-form-ajax');

// Modify the objects we need
updateGardenerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_gardenerID = document.getElementById("input-update-gardener-id");
    let input_fname = document.getElementById("input-update-gardener-first-name");
    let input_lname = document.getElementById("input-update-gardener-last-name");
    let input_address = document.getElementById("input-update-gardener-streetAddress");
    let input_city = document.getElementById("input-update-gardener-city");
    let input_zip = document.getElementById("input-update-gardener-zipCode");
    let input_email = document.getElementById("input-update-gardener-email");
    let input_phone = document.getElementById("input-update-gardener-phone");


    // Get the values from the form fields
    let gardenerIDValue = input_gardenerID.value;
    let firstnameValue = input_fname.value;
    let lastnameValue = input_lname.value;
    let addressValue = input_address.value;
    let cityValue = input_city.value;
    let zipValue = input_zip.value;
    let emailValue = input_email.value;
    let phoneValue = input_phone.value;

    // NAN??

    // Put our data we want to send in a javascript object
    let data = {
        gardenerID: gardenerIDValue,
        firstName: firstnameValue,
        lastName: lastnameValue,
        streetAddress: addressValue,
        city: cityValue,
        zip: zipValue,
        email: emailValue,
        phone: phoneValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-gardener-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, gardenerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})



function updateRow(data, gardenerID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("gardeners-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == gardenerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of value
            let tdfirstName = updateRowIndex.getElementsByTagName("td")[1];
            let tdlastName = updateRowIndex.getElementsByTagName("td")[2];
            let tdAddress = updateRowIndex.getElementsByTagName("td")[3];
            let tdCity = updateRowIndex.getElementsByTagName("td")[4];
            let tdZip = updateRowIndex.getElementsByTagName("td")[5];
            let tdPhone = updateRowIndex.getElementsByTagName("td")[6];
            let tdEmail = updateRowIndex.getElementsByTagName("td")[7];

            // Reassign to our value we updated to
            tdfirstName.innerHTML = parsedData[0].firstName;
            tdlastName.innerHTML = parsedData[0].lastName;
            tdAddress.innerHTML = parsedData[0].streetAddress;
            tdCity.innerHTML = parsedData[0].city;
            tdZip.innerHTML = parsedData[0].zip;
            tdPhone.innerHTML = parsedData[0].phone;
            tdEmail.innerHTML = parsedData[0].email;
        }
    }
}

