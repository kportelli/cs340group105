// get the selected plantID
let plantsPlotsInput = document.getElementById("update-plants-plots-plantsplots-id");

// when a new option is selected, capture the value
plantsPlotsInput.addEventListener("change", function() {
    let plantsPlotsData = plantsPlotsInput.value;
    plantsPlotsData = decodeURI(plantsPlotsData);

    let plantInput = document.getElementById("update-plants-plots-plant-id");
    let plotInput = document.getElementById("update-plants-plots-plot-id");

    // if nothing is selected in the plantsplots dropdown, reset the form inputs and return
    if (plantsPlotsData == "default-plantplot") {
        
        plantInput.value = "";
        plotInput.value = "";

        return;
    }

    // parse data into JSON object
    let parsedData = JSON.parse(plantsPlotsData);

    // select the existing form inputs that match the plant and plot IDs
    plantInput.value = parsedData.plantID;
    plotInput.value = parsedData.plotID;

    // get the select option plantID input
    let plantOption = document.getElementById("update-plants-plots-plant-id");
    let plantIndex = 0;
    // iterate through all plantOption indices
    for (let i = 0, option; option = plantOption.options[i]; i++) {
        // if the option value is the same as the plantID
        if (option.value == parsedData.plantID) {
            // set the text to the plantID and plantName
            // option.text = `${parsedData.plantID} ${parsedData.plantName}`;
            plantIndex = i;
            // break out of the loop
            break;
        }
    }
    plantOption.selectedIndex = plantIndex;

    // get the select option plotID input
    let plotOption = document.getElementById("update-plants-plots-plot-id");
    let plotIndex = 0;
    // iterate through all plotOption indices
    for (let i = 0, option; option = plotOption.options[i]; i++) {
        // if the option value is the same as the plotID
        if (option.value == parsedData.plotID) {
            // set the text to the plotID and plotName
            // option.text = `${parsedData.plotID} ${parsedData.plotName}`;
            plotIndex = i;
            // break out of the loop
            break;
        }
    }

    // plantInput.value = parsedData.plantID; // `${} ${} ${}`
    // plotInput.value = parsedData.plotID; // `${} ${} ${}`
});