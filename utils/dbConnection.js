const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

db.connect((err) => {
  if (err) console.log(err);
});

module.exports = db;
