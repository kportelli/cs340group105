// This function is used to reset the database. It sends an AJAX request to the endpoint which 
// runs the cleanup and ddl scripts. If the request is successful, the user is alerted that the
// database has been reset and the page is refreshed. If the request is not successful, the user
// is alerted that the database was not reset.
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