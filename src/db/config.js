// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'food_ordering_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+0200',
});




module.exports = pool

