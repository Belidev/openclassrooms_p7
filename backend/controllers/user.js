const bcrypt = require('bcrypt')
const mysql = require('mysql2');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { mainModule } = require('process');
const { response } = require('../app');
const db = mysql.createConnection({

  host: process.env.VAR1,
  user: process.env.VAR2,
  password: process.env.VAR0,
  database : process.env.VAR3

});

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      console.log(req.body)
      let param = [req.body.name, req.body.firstname, req.body.email, hash]
      let sql = `INSERT INTO usertable(name, firstname, email, password, fkrole) VALUES( ?, ?, ?, ?, 'user')`;
      let query = db.query(sql, param,(err, result) => {
        if (err) {
          res.status(401);
          throw (err)
        }
        else {
          res.send('user added in usertable !');
        };
      });
    })
};

exports.login = (req,res, next) => {
  sqlParam = req.body.email
  sql = `SELECT email FROM usertable WHERE email=?`;
  let query = db.query(sql, sqlParam, (err, result) => {
    if (result.length == 0) {
      console.log('email non valide')
      res.status(401).json({
        error : "utilisateur non existant"
      })
      throw 'Invalid user';
    }
    passwordSql = `SELECT password FROM usertable WHERE email =?`
   //on vérifie l'email via la BDD
      let query = db.query(passwordSql, sqlParam,(err, result) => {
        hash = result[0].password
        requestPass = req.body.password
          passwordCheck = bcrypt.compare(requestPass, hash, function(err, response) { // on compare les MDP avec Bcrypt
            if (response == false){
              throw 'Invalid user';
            }
            if (response == true) {
              console.log('true password')
              idSql = `SELECT * FROM usertable WHERE email =?`
              let idRequest = db.query(idSql, sqlParam,(err, userId) => {
              const accessToken = jwt.sign({ usermail: req.body.email, role: `${userId[0].fkrole}`}, process.env.VAR4);
              res.status(200).json({
                email : userId[0].email,
                userId : userId[0].iduser,
                role : userId[0].fkrole,
                accessToken
                });
              })
            }
        });
      })
    })
  };
exports.updateUser = (req, res, next) => {
hash = bcrypt.hash(req.body.password, 10)
.then(hash =>{
  let sqlParam = [req.body.name, req.body.firstname, req.body.email, hash, req.body.id]
  let showUserArticlesSql = `UPDATE usertable SET name=?, firstname=?, email=?, password=? WHERE iduser=?`
  let query = db.query(showUserArticlesSql, sqlParam, (err, userArticle) => {
    if (err) {
      res.status(401)
      throw err
    }
    else res.status(200).json({
      response : "votre profil est modifié!",
      email : req.body.email
    })
  })
})
};