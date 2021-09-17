const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.VAR4);
    const userId = decodedToken.usermail;
    const userRole = decodedToken.role;
    console.log(req.body.role && req.body.role !== "admin")
    if (req.body.usermail && req.body.usermail !== userId) {
        throw 'Invalid user ID';
    }
    else if(req.body.role && req.body.role && userRole !== "admin"){
        throw 'Invalid user ID';
    }
    else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};