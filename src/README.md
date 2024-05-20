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

#### Load the data from `DDL.sql`
```sql
use goc_dev
source ../DDL.sql
```

### Create a new user for your local database
Make sure you are logged in as the root user.

```sql
CREATE USER 'api_user'@'localhost' IDENTIFIED BY 'strong_password';
```
Provide a strong password for this user and make sure to remember it.

#### Grant the user necessary permissions to access the database
In this example, the development database is `goc_dev`. If you have a different database name, replace `goc_dev` with your database name.
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON goc_dev.* TO 'api_user'@'localhost';
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
```
#### Additional changes
I ran into some issues with my new user. I found this link helpful: https://stackoverflow.com/questions/51147964/errno-1251-sqlmessage-client-does-not-support-authentication-protocol-reques

Here is the SQL command I ran to fix the issue:
```sql
ALTER USER 'api_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';
```

Remember to replace `your_current_password` with the password you set for the `api_user`.

## Things to note
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