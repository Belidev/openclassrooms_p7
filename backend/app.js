const express = require('express')
const path = require('path')
var cors = require('cors')
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require (`bcrypt`);
require('dotenv').config();
const userRoutes = require('./route/user')
const articleRoutes = require('./route/article')

//création d'une connexion vers la base de donnée
const db = mysql.createConnection({

  host: process.env.VAR1,
  user: process.env.VAR2,
  password: process.env.VAR0,
  database : process.env.VAR3

});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors())

app.use(bodyParser.json());

app.use('/api/auth', userRoutes)
app.use('/api/article', articleRoutes)

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE groupomania';
  db.query (sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('database created !');
  });
});

// create table
app.get('/createusertable' , (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS usertable(iduser int AUTO_INCREMENT, name VARCHAR(30), firstname VARCHAR(50), email VARCHAR(50), password VARCHAR(255), fkrole VARCHAR(30), UNIQUE(email), CONSTRAINT FOREIGN key(fkrole) REFERENCES roletable(role) on DELETE CASCADE on UPDATE CASCADE, PRIMARY KEY(iduser))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('usertable created in groupomania database !');
  });
});

// create article table
app.get('/createarticletable' , (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS articletable(idtable int AUTO_INCREMENT, name VARCHAR(30), firstname VARCHAR(50), text VARCHAR(500), fkemail VARCHAR(50), fkiduser int, CONSTRAINT FOREIGN key(fkemail) REFERENCES usertable(email) on DELETE CASCADE on UPDATE CASCADE, CONSTRAINT FOREIGN key(fkiduser) REFERENCES usertable(iduser) on DELETE CASCADE on UPDATE CASCADE, PRIMARY KEY(idtable))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('articletable created in groupomania database !');
  });
});

app.get('/createarticlecommentary' , (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS articlecommentary(idcommentary int AUTO_INCREMENT, name VARCHAR(30), firstname VARCHAR(50), text VARCHAR(500), fkiduser int, fkidtable int, CONSTRAINT FOREIGN key(fkiduser) REFERENCES usertable(iduser) on DELETE CASCADE on UPDATE CASCADE, CONSTRAINT FOREIGN key(fkidtable) REFERENCES articletable(idtable) on DELETE CASCADE on UPDATE CASCADE, PRIMARY KEY(idcommentary))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('articlecommentary created in groupomania database !');
  });
});

app.get('/createarticlecommentary' , (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS roletable(idrole int AUTO_INCREMENT, role VARCHAR(30), UNIQUE(role), PRIMARY KEY(idrole))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('roletable created in groupomania database !');
  });
});

app.get('/createroleuser' , (req, res) => {
  let sql = 'INSERT INTO roletable(role) VALUES("user")';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('user role created in groupomania database !');
  });
});

app.get('/createroleadmin' , (req, res) => {
  let sql = 'INSERT INTO roletable(role) VALUES("admin")';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('admin role created in groupomania database !');
  });
});

///////////////////////////////////////////////

module.exports = app;