// Citation for the registration of handlebars helpers in the express-handlebars object (exphbs)
// Date: 10 June 2024
// Adapted from the express-handlebars documentation
// Source URL: https://github.com/express-handlebars/express-handlebars#:~:text=helpers%3A%20%7B%0A%20%20%20%20%20%20%20%20foo()%20%7B%20return%20%27FOO!%27%3B%20%7D%2C%0A%20%20%20%20%20%20%20%20bar()%20%7B%20return%20%27BAR!%27%3B%20%7D%0A%20%20%20%20%7D

// Citation for routes in the express app
// Date: 10 June 2024
// Adapted from the course content of CS290 at Oregon State University. Although I don't know
//  where that documentation is, this was a required part of the coureswork, and what I would imagine 
//  to be prerequisite knowledge for this course. I was able to find a similar example on Stack Overflow which is linked below.
// Source URL: https://stackoverflow.com/questions/32284092/node-js-express-export-routes-for-organization#:~:text=In%20your%20new%20routes%20module%20(eg%20in%20api/myroutes.js)%2C%20export%20the%20module.

// Citation for the remaining code in this file
// Date: 10 June 2024
// Adapted from the nodejs-starter-app provided by the instructor. The routes are placed in their own files, 
//  and then registered with the app in this file. This pattern is used to improve code organization, code readability,
//  and reduce friction between developers working on the same codebase (reduces merge conflicts).
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/app.js

// express setup
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// handlebars setup
var exphbs = require('express-handlebars');         // Import express-handlebars
const helpers = require('./helpers/handlebars');    // Import the handlebars helper functions
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: helpers
});
app.engine('.hbs', hbs.engine);                     // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// read routes from their respective files
const pagesRoutes = require('./routes/index');
const plantsRoutes = require('./routes/plants');
const gardensRoutes = require('./routes/gardens');
const gardenersRoutes = require('./routes/gardeners');
const plotsRoutes = require('./routes/plots');
const plantsPlotsRoutes = require('./routes/plantsplots');
const plotsGardenersRoutes = require('./routes/plotsgardeners');
const invoiceDetailsRoutes = require('./routes/invoicedetails');
const invoicesRoutes = require('./routes/invoices');
const dbmanagementRoutes = require('./routes/dbmanagement');

// register routes with the app
app.use(pagesRoutes);
app.use(plantsRoutes);
app.use(gardensRoutes);
app.use(gardenersRoutes);
app.use(plotsRoutes);
app.use(plantsPlotsRoutes);
app.use(plotsGardenersRoutes);
app.use(invoiceDetailsRoutes);
app.use(invoicesRoutes);
app.use(dbmanagementRoutes);

// home/index route
app.get('/', function (req, res)
{
    res.render('index'); // render the index.hbs file
});

// Listen on a port for incoming requests
PORT = 34959;
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});