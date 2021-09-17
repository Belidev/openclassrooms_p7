const { cp } = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.VAR4);
    const userMail = decodedToken.usermail;
    const userRole = decodedToken.role;
    if (req.body.email && req.body.email !== userMail) {
      console.log("erreur id")
      throw 'Invalid user ID';
    }
      else if(req.body.role === userRole && userRole !== "user" && userRole !== "admin"){
        console.log("erreur role")
      throw 'Invalid user ID';
    } 
    else {
      next();
    }
  } catch(e) {
    console.log(e)
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};