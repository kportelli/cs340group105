/*
    SETUP
*/
var db = require('./database/db-connector');
var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');         // Import express-handlebars
const helpers = require('./helpers/handlebars');    // Import the helper functions

// handlebars setup
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: helpers
});
app.engine('.hbs', hbs.engine);    // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

const pagesRoutes = require('./routes/pages');
const plantsRoutes = require('./routes/plants');
const gardensRoutes = require('./routes/gardens');
const gardenersRoutes = require('./routes/gardeners');
const plotsRoutes = require('./routes/plots');
const plantsPlotsRoutes = require('./routes/plantsplots');
const plotsGardenersRoutes = require('./routes/plotsgardeners');
const invoiceDetailsRoutes = require('./routes/invoicedetails');

PORT = 9124;

app.use(pagesRoutes);
app.use(plantsRoutes);
app.use(gardensRoutes);
app.use(gardenersRoutes);
app.use(plotsRoutes);
app.use(plantsPlotsRoutes);
app.use(plotsGardenersRoutes);
app.use(invoiceDetailsRoutes);

app.get('/', function (req, res)            // // This is the basic syntax for what is called a 'route'
{
    res.render('index');
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});