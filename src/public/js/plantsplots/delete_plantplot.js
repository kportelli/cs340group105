function deletePlantPlot(plantsPlotsID) {
    // Put our data we want to send in a javascript object
    let data = { plantsPlotsID: plantsPlotsID };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-plantplot-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(plantsPlotsID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(ID) {
    
    let updatePlantPlotSelect = document.getElementById("update-plants-plots-plantsplots-id");
    let table = document.getElementById("plantsplots-table");
    let index = 0;
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == ID) {
            table.deleteRow(i);
            index = i;
            break;
        }
    }

    for (let i = 0, option; option = updatePlantPlotSelect.options[i]; i++) {
        let value = decodeURI(option.value);
        if (value == "default-plantplot") {
            continue;
        }
        if (JSON.parse(value).plantsPlotsID == ID) {

            // if the deleted plantplot is the one selected in the "update plantplot" form, reset the form
            if (decodeURI(updatePlantPlotSelect.value) != "default-plantplot" && 
            JSON.parse(decodeURI(updatePlantPlotSelect.value)).plantsPlotsID == ID) {

                // clear the input fields
                let inputPlantID = document.getElementById("update-plants-plots-plot-id");
                let inputPlotID = document.getElementById("update-plants-plots-plant-id");

                inputPlantID.value = '';
                inputPlotID.value = '';

                updatePlantPlotSelect.selectedIndex = 0;
                index = i;
                break;
            }
        }
    }

    updatePlantPlotSelect.remove(index);
}