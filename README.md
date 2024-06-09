# Growing our Community
Growing our Community is a project that revolves around community gardens. This project is the culmination of twelve weeks of work by Group 105, for the CS 340 course at Oregon State University. The project is a web application that allows users to create and manage community gardens. Users can create a garden, and manage the garden by adding plots, plants, gardeners, and invoices for transactions involving both plants and gardeners. 

This project is built on NodeJS, MySQL, and HandlebarsJS.

# Project Overview
- [Database](./src/database): MySQL
  - [ddl.sql](./src/database//ddl.sql): Contains the DDL for the database
  - [dmq.sql](./src/database/dmq.sql): Contains the DML for the database
- [Backend](./src): NodeJS
  - [db-connector.js](./src/database/db-connector.js): Contains the connection pool for the database
  - [app.js](./src/app.js): Contains the main entry point for the server application
  - [routes](./src/routes): Contains the routes for the server application
- [Frontend](./src/views): HandlebarsJS
  - [layouts](./src/views/layouts): Contains the layouts for the views
  - [partials](./src/views/partials): Contains the partials for the views
  - [public](./src/public): Contains the public assets for the site
    - [css](./src/public/css/): Contains the CSS files for the views
    - [js](./src/public/js/): Contains the JS files for the views, including helpers, event handlers, and AJAX requests


# Development Guide: So you want to run the project?
Here's how you do it.

## Step 1: Clone the repository
First, you need to clone the repository. You can do this by running the following command in your terminal:
``` bash
git clone [repository-url]
```

## Step 2: Install the dependencies
Next, you need to install the dependencies. You can do this by running the following command in your terminal:
```
npm install
```

## Step 3: Set up the database
You need to set up the database. First thing to do would be log into MySQL and create a new database. You can do this by running the following command in your terminal:
``` bash
mysql -u [username] -p
```
Enter your password when prompted.

Then, you can create the database by running the following command in MySQL:
``` sql
CREATE DATABASE [database-name];
``` 

We've been using `goc_dev` as the development database name, but you can use whatever you want. From here on out we are going to supply actual values you can use to get the database set up. If you want to use different values, feel free to do so.

``` sql
CREATE DATABASE goc_dev;
```

Okay, now that you have the database set up, you need to create the tables. Thankfully we've created files to do this for you. All you need is the path to the [`ddl.sql`](./src/database/ddl.sql) file. If you have no idea where you started the mysql client, use the absolute path of the [`ddl.sql`](./src/database/ddl.sql) file. We just talked about supplying you with information to expidite this process and now we've come to a point where you need to supply the information. Classic.
``` sql
source [path-to-ddl.sql];
```

Unless something has gone horribly wrong, you now have the tables set up and populated with some seed data. You can check those out with basic SQL queries such as `SELECT * FROM Plants;` and `SELECT PlantsPlots.plantsPlotsID, Plots.plotID, Plants.plantID, Plants.varietyName, Plants.type, Gardens.gardenID, Gardens.gardenName FROM PlantsPlots INNER JOIN Plants ON PlantsPlots.plantID = Plants.plantID INNER JOIN Plots ON PlantsPlots.plotID = Plots.plotID INNER JOIN Gardens ON Plots.gardenID = Gardens.gardenID ORDER BY PlantsPlots.plantsPlotsID ASC`. Feel free to take a look at the [`dmq.sql`](./src/database/dmq.sql) file for more queries. We included all of the queries used in our application in that file, so as long as your database is set up correctly, you should be able to run any of them.

## Step 4: Create a user for the database
Make sure you are logged in as the root user when performing these steps. Here, we will create two users: `api_user` and `api_admin`. The `api_user` will have limited access to the database, while the `api_admin` will have full access and support multiple SQL statements in a single query in the node app. Both are used in this application, so both should be created.

These commands are fully functional in the MySQL client, so, as long as these credentials work for you (as in, you can vibe with them), feel free to copy them from here and paste them into the terminal to speed things up. 

```sql
CREATE USER 'api_user'@'localhost' IDENTIFIED BY ';0JBY)}kXx"un}O0';
CREATE USER 'api_admin'@'localhost' IDENTIFIED BY ';0JBY)}kXx"un}O0';
```
Provide a strong password for this user and make sure to remember it. In general, I recommend using [a password generator](https://passwords-generator.org/) to create a strong password and then to store it in a safe, underground.

Now that you have the users created, you need to grant them the necessary permissions to access the database.

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON goc_dev.* TO 'api_user'@'localhost';
GRANT ALL PRIVILEGES ON goc_dev.* TO 'api_admin'@'localhost';
```

### Flush privileges, just to be safe
```sql
FLUSH PRIVILEGES;
```
## Step 5: Setup your [`db-connector.js`](./src/database/db-connector.js) file
Okay, now that the database is setup correctly, you need to make sure that the [`db-connector.js`](./src/database/db-connector.js) file is set up correctly. Taking a peek into the file, we see a few important lines of code, specifically the `pool` and `adminpool` objects:
``` js
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',          // <-- This is the host of your MySQL server
    user            : 'api_user',           // <-- This is the username of your user
    password        : ';0JBY)}kXx"un}O0',   // <-- This is the password of your user
    database        : 'goc_dev'             // <-- This is the name of your database
});

var adminpool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',          // <-- same as above
    user            : 'api_admin',          // <-- same as above
    password        : ';0JBY)}kXx"un}O0',   // <-- same as above
    database        : 'goc_dev',            // <-- same as above
    multipleStatements: true                // <-- not the same as above
});
```
Make sure to update the `host`, `user`, `password`, and `database` fields to match your MySQL server. If you are running this on your local machine, the `host` should be `localhost`. If you are running this on a server, the `host` should be the IP address of the server. The `user` and `password` fields should be the username and password of the user you created in MySQL. The `database` field should be the name of the database you created in MySQL (in Step 3).

## One more thing
I ran into some issues with the users setup for this database. I found this link helpful: https://stackoverflow.com/questions/51147964/errno-1251-sqlmessage-client-does-not-support-authentication-protocol-reques

Here is the SQL command I ran to fix the issue:
```sql
ALTER USER 'api_user'@'localhost' IDENTIFIED WITH mysql_native_password BY ';0JBY)}kXx"un}O0';
ALTER USER 'api_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY ';0JBY)}kXx"un}O0';
```

## And that's it!
You should be able to run the project now. You can do this by running the following command in your terminal (make sure you are in the root directory of the project, i.e., in the [`src`](./src/) directory):
``` bash
node app.js
```

# Deployment
This site is deployed on Oregon State University's `classwork` servers. You can access the site [here](http://classwork.engr.oregonstate.edu:34959/). You'll need to be on the Oregon State University network to access the site.

## Step 1: Clone the repository on the server
First, you need to clone the repository on the server. I've had tons of issues with trying to clone via HTTPS, so I recommend cloning via SSH. You can do this by running the following command on the server:

``` bash
git clone git@github.com:kportelli/cs340group105.git
```

You might need to setup an ssh key on the server. You can do this by following the instructions [here](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

## Step 2: Install the dependencies
Next, you need to install the dependencies. This is the same process as described [above](./README.md#step-2-install-the-dependencies).

## Step 3: Set up the database
This is the same process as described [above](./README.md#step-3-set-up-the-database).

## Step 4: Create users for the database
This is the same process as described [above](./README.md#step-4-create-a-user-for-the-database).

## Step 5: Setup your [`db-connector.js`](./src/database/db-connector.js) file
This is the same process as described [above](./README.md#step-5-setup-your-db-connectorjs-file). **But**, these credentials will be different on the Oregon State University servers. You will need to use the credentials provided to you by the school.

## Step 6: Run the project
This is where things get a little different. You can't just run `node app.js` and call it a day. You need to run the project continuously. We use [Forever.JS](https://blog.logrocket.com/running-node-js-scripts-continuously-forever/) to do this. You can install Forever.JS by running the following command on the server:
``` bash
npm i -g forever
```

For reasons beyond our control, running forever is a bit more complex on the school's FLIP server. Here is how to make it easy, run the following command from the root of your project in order to create an alias for forever:
``` bash
alias forever='./node_modules/forever/bin/forever'
```

You must run the forever command from the root of your project (where app.js is located). If you don't it will fail. This assumes (as it should) that your entry point is `app.js`.
``` bash
forever start app.js
```

And that's it! Now it will run forever. You should be able to access the site at the provided URL. If you run into any issues, feel free to reach out to [me](mailto:alokbya@oregonstate.edu). I'll do my best to help you out.