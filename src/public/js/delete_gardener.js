// Citation for the following function:
// Date: 12/02/2022
// Copied from /OR/ Adapted from /OR/ Based on
// (Explain degree of originality)
// Source URL: http://www.oregonstate.edu/mysource
//
// DELETE BELOW THIS LINE
// Citation instructions:
// Final Project rubric: 25 of 600 pts. 
// "Full Marks: Citations in readme AND in source code include FULL DETAILS of 
// 1) citation scope (e.g. module, function or line)
// 2, date,
// 3) originality, (copied, adapted, or based, e.g. "Based on the CS 340 starter code, with the exception of..."),
// 4) source (e.g. URL)
// Syllabus: 
// "We also expect you to comment any code that is not your own so that we can see you understand how it works.
// Any code that is not your own needs to be cited. The code from the class starter apps is not your own code. 
// A snippet of code you copied from StackOverFlow is not your own code.


function deleteGardener(gardenerID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: gardenerID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-gardener-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(gardenerID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(gardenerID) {

    let table = document.getElementById("gardeners-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == gardenerID) {
            table.deleteRow(i);
            break;
        }
    }
}