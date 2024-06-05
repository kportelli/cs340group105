function resetDatabase() {
    // make xhttp request to the server to run the cleanup and ddl scripts
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/db-management-reset", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // alert the user that the database has been reset
            alert("Database has been reset.");

            // refresh page
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("Failed to reset database.");
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}