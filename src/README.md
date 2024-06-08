## Development
## Create a database and load data
### Log into your local mysql server
```
mysql -u root -p
```
Enter your password when prompted.

#### Create a development database
In this example, the development database is `goc_dev`. If you have a different database name, replace `goc_dev` with your database name.
```sql
create database goc_dev
```

#### Switch to the development database
```sql
use goc_dev
```

#### Load the data from `DDL.sql`
```sql
source ../DDL.sql
```

### Create new users for your local database to support the API
Make sure you are logged in as the root user when performing these steps. Here, we will create two users: `api_user` and `api_admin`. The `api_user` will have limited access to the database, while the `api_admin` will have full access to the database. The `api_admin` will also support multiple SQL statements in a single query in the node app.

```sql
CREATE USER 'api_user'@'localhost' IDENTIFIED BY ';0JBY)}kXx"un}O0';
CREATE USER 'api_admin'@'localhost' IDENTIFIED BY ';0JBY)}kXx"un}O0';
```
Provide a strong password for this user and make sure to remember it.

#### Grant the user necessary permissions to access the database
In this example, the development database is `goc_dev`. If you have a different database name, replace `goc_dev` with your database name.
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON goc_dev.* TO 'api_user'@'localhost';
GRANT ALL PRIVILEGES ON goc_dev.* TO 'api_admin'@'localhost';
```

#### Flush privileges
```sql
FLUSH PRIVILEGES;
```

#### Update the connection pool in the node app
```node
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'api_user',
    password: 'strong_password',
    database: 'goc_dev'
});

const admin_pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'api_admin',
    password: 'strong_password',
    database: 'goc_dev',
    multipleStatements: true
});

```
#### Additional changes
I ran into some issues with my new user. I found this link helpful: https://stackoverflow.com/questions/51147964/errno-1251-sqlmessage-client-does-not-support-authentication-protocol-reques

Here is the SQL command I ran to fix the issue:
```sql
ALTER USER 'api_user'@'localhost' IDENTIFIED WITH mysql_native_password BY ';0JBY)}kXx"un}O0';
ALTER USER 'api_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY ';0JBY)}kXx"un}O0';
```

Remember to replace `';0JBY)}kXx"un}O0'` with the password you set for the `api_user` and `api_admin`. The provided passwords are for development purposes and require a user to be setup with that inforamtion on your local machine. Feel free to copy and paste each command into your terminal to avoid any typos.

## Deployment
To deploy, we use [Forever.JS](https://blog.logrocket.com/running-node-js-scripts-continuously-forever/).
For reasons beyond your control, running forever is a bit more complex on the school's FLIP server. Here is how to make it easy, run the following command from the root of your project:
```
alias forever='./node_modules/forever/bin/forever'
```
You must run the forever command from the root of your project (where app.js is located). If you don't it will fail.

```
forever start app.js
```
You can verify that your project will run forever (pun sort-of intended), by closing out of your terminal now. Ensure you are still connected to the OSU VPN and navigate to your web application again. If it loads, `forever` is working.

This guidance on implementing `forever` can be used on any Node.JS project, and can be used in any step outlined in this walkthrough.

# Citations
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