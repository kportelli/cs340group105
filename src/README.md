# Citations

To see the references used to build this project, please see the [Citations](../citations.txt) file, which includes a comprehensive list of all the resources that were referenced to build this project.

## Common patterns used
### API Routing
Throughout the server, routes are defined in their own files in an attempt to organize the code and improve its readability. This is done by leveraging the [Express Routes API](https://expressjs.com/en/4x/api.html#router) to define endpoints and their corresponding handlers, and found in the [`routes`](./routes/) directory of the server codebase.
An example from the Express documentation shows this process in action:
```javascript
var express = require('express')
var app = express()
var router = express.Router()

// customizing the behavior of router.param()
router.param(function (param, option) {
  return function (req, res, next, val) {
    if (val === option) {
      next()
    } else {
      res.sendStatus(403)
    }
  }
})

// using the customized router.param()
router.param('id', '1337')

// route to trigger the capture
router.get('/user/:id', function (req, res) {
  res.send('OK')
})

app.use(router)

app.listen(3000, function () {
  console.log('Ready')
})
```

### Module Export
This is a pretty common pattern in Node.js, where you can export a module and import it in another file. Although it can be argued that this is *common knowledge*, here is the source for the [Node.js documentation](https://nodejs.org/api/modules.html#modules_modules) for reference; and here is an example of how it is used in the server codebase:
```javascript
// In a file named `example.js`
module.exports = {
  exampleFunction: function() {
    console.log('This is an example function');
  }
}
```

```javascript
// In another file
const example = require('./example.js');
example.exampleFunction();
```

### Handlebars Helpers
This was fun to learn and should be noted as a common pattern in HandlebarsJS projects. Handlebars allows you to define custom helpers that can be used in your templates. This is useful for creating reusable components or for adding logic to your templates. In our case, we used it to format strings that represent dollar values, and to encode and parse strings into JSON objects so that they could be deconstructed by event handlers which process these objects as well as associated data. Here is the source for the [Handlebars documentation](https://handlebarsjs.com/guide/#custom-helpers) for reference; and here is an example of how it is used in the server codebase:
```javascript
// In a file named `helpers.js`
module.exports = {
  formatDollars: function(value) {
    return '$' + value.toFixed(2);
  },
  json: function(context) {
    return JSON.stringify(context);
  }
}
```

```javascript
// In another file
const hbs = require('express-handlebars');
const helpers = require('./helpers.js');

app.engine('hbs', hbs({
  // other properties...
  helpers: helpers
}));
```

And in the handlebars file, using these helpers looks like this...
```handlebars
{{formatDollars total}}
```
Here we are passing `total` to the `formatDollars` helper, which will return the value of `total` formatted as a dollar amount.