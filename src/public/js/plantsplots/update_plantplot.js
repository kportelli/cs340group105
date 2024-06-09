// Citation for event handler on the 'submit' event for updating an entity
// Date: 10 June 2024
// Adapted from the nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/update_person.js

// Citation for decodeURI()
// Date: 10 June 2024
// Adapted from MDN Web docs. Used to decode a string so it can then be parsed into an object.
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI

// Get the objects we need to modify
let updateGardenForm = document.getElementById('update-plantplot-form-ajax');

// Modify the objects we need
updateGardenForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_plantPlotID = document.getElementById("update-plants-plots-plantsplots-id");
    let input_plotID = document.getElementById("update-plants-plots-plot-id");
    let input_plantID = document.getElementById("update-plants-plots-plant-id");

    // Get the values from the form fields
    let plantsPlotsIDValue = JSON.parse(decodeURI(input_plantPlotID.value)).plantsPlotsID;

    // in case the user tries to submit a non-integer value (default)
    if (isNaN(plantsPlotsIDValue)) {
        // empty the input fields
        input_plotID.value = '';
        input_plantID.value = '';
        return;
    }

    let plotIDValue = input_plotID.value;
    let plantIDValue = input_plantID.value;

    // Put our data we want to send in a javascript object
    let data = {
        plantsPlotsID: plantsPlotsIDValue,
        plotID: plotIDValue,
        plantID: plantIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-plantplot-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, plantsPlotsIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, plantPlotID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("plantsplots-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == plantPlotID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdPlotID = updateRowIndex.getElementsByTagName("td")[1];
            let tdPlant = updateRowIndex.getElementsByTagName("td")[2];
            let tdGarden = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            tdPlotID.innerText = parsedData[0].plotID;
            tdPlant.innerText = `${parsedData[0].plantID} ${parsedData[0].varietyName} ${parsedData[0].type}`;
            tdGarden.innerText = `${parsedData[0].gardenID} ${parsedData[0].gardenName}`;
            
            break;
        }
    }

    // update garden in update garden select options
    let updatePlantPlotSelect = document.getElementById("update-plants-plots-plantsplots-id");
    let index = 0;
    for (let i = 0, option; option = updatePlantPlotSelect.options[i]; i++) {
        if (option.value == "default-plantplot") {
            continue;
        }
        if (JSON.parse(decodeURI(option.value)).plantsPlotsID == plantPlotID) {
            option.text = `${parsedData[0].plantsPlotsID} ${parsedData[0].varietyName} ${parsedData[0].type} ${parsedData[0].gardenName}`;
            break;
        }
    }

    // reset select option to default
    updatePlantPlotSelect.selectedIndex = 0; // Reset to the first option

    // reset form input fields
    document.getElementById("update-plants-plots-plot-id").selectedIndex = 0;
    document.getElementById("update-plants-plots-plant-id").selectedIndex = 0;
}