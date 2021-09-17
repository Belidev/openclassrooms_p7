const mysql = require('mysql2');
const db = mysql.createConnection({

    host: process.env.VAR1,
    user: process.env.VAR2,
    password: process.env.VAR0,
    database : process.env.VAR3
  
});

exports.create = (req, res, next) => {
  sqlParam = [req.body.username, req.body.userfirstname, req.body.text, req.body.email, req.body.iduser]
  let newArticleSql = `INSERT INTO articletable(name, firstname, text, fkemail, fkiduser) VALUES(?, ?, ?, ?, ?)`
  let query = db.query(newArticleSql, sqlParam, (err, result) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    res.status(201).json({
      message : "article ajouté"
    })
  })
};

exports.getall = (req, res, next) => {
  let showAllArticleSql = `SELECT * from articletable`
  let query = db.query(showAllArticleSql, (err, result) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    response = []
    response = result
    res.send(response)
  })
}

exports.getUserArticle = (req, res, next) => {
  let sqlParam = req.headers.access
  let showUserArticlesSql = `SELECT * FROM articletable WHERE fkiduser = ?`
  let query = db.query(showUserArticlesSql, sqlParam, (err, userArticles) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    response = []
    response = userArticles
    res.send(response)
  })
}

exports.getOneArticle = (req, res, next) => {
  let sqlParam = req.headers.access
  let showUserArticlesSql = `SELECT * FROM articletable WHERE idtable = ?`
  let query = db.query(showUserArticlesSql, sqlParam, (err, userArticle) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    response = []
    response = userArticle
    res.status(200).send(response);
  })
}

exports.deleteOneArticle = (req, res, next) => {
  let sqlParam = req.headers.access
  let showUserArticlesSql = `DELETE FROM articletable WHERE idtable = ?`
  let query = db.query(showUserArticlesSql, sqlParam, (err, userArticle) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    res.status(200).json({
      response : "votre article est bien effacé"
    })
  })
};

exports.getAllCommentary = (req, res, next) => {
  let sqlParam = req.headers.access
  let showCommentarySql = `SELECT * FROM articlecommentary WHERE fkidtable = ?`
  let query = db.query(showCommentarySql, sqlParam, (err, articleCommentary) => {
    if (articleCommentary == [])
      res.status(204).json({
        message : "il n'y pas de commentaires sous cet article"
      })
    else {
      res.status(200).json({
        comment : articleCommentary
      })
    }
  })
}

exports.postComment = (req, res, next) => {
  let sqlParam = [req.body.firstname, req.body.name, req.body.text, req.body.iduser, req.body.idarticle]
  let postCommentSql = `INSERT INTO articlecommentary(name, firstname, text, fkiduser, fkidtable) VALUES(?, ?, ?, ?, ?)`
  let query = db.query(postCommentSql, sqlParam, (err, result) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    res.status(201).json({
      message : "commentaire ajouté"
    })
  })
}

exports.getUserComment = (req, res, next) => {
  sqlParam = req.headers.access
  let sql = `SELECT * FROM articlecommentary WHERE fkiduser = ?`
  let query = db.query(sql, sqlParam, (err, result) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    if (result == []){
      res.status(204).json({
        message : "il n'y a aucun commentaire écrit par cet utilisateur"
      })
    }
    else { 
      response = []
      response = result
      res.status(200).send(response)
    }
  })
}

exports.deleteOneComment = (req, res, next) =>{
  sqlParam = req.headers.access
  let sql = `DELETE FROM articlecommentary WHERE idcommentary=?`
  let query = db.query(sql, sqlParam, (err, result) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    else {
      res.status(200).json("votre commentaire est bien effacé!")
    }
  })
}

exports.deleteCommentAdmin = (req, res, next) =>{
  sqlParam = req.headers.access
  let sql = `DELETE FROM articlecommentary WHERE idcommentary=?`
  let query = db.query(sql, sqlParam, (err, result) => {
    if (err) {
      res.status(401)
      throw (error)
    }
    else {
      res.status(200).json("votre commentaire est bien effacé!")
    }
  })
}