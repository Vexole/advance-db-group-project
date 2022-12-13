require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');

const router = require('./routes/routes');
const db = require('./utils/dbConnection');

global.isLoggedIn = false;
const app = express();
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.set('view engine', 'ejs');

app.get('/seedDB', (req, res) => {
  let sql = 'CREATE DATABASE bookstore';
  db.query(sql, (err, result) => {
    console.log(result);
  });
});

const PORT = 4500;
app.listen(PORT, () => {
  console.log('Server started at 4500');
});
