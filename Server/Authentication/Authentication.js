require('dotenv').config();
const jwt = require('jsonwebtoken');
const isAuthenticated = (req, res, next) => {
  console.log("Authentication is tested");
 
  const token = req.cookies.jwtToken;
 console.log("token",token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const data = jwt.verify(token, `${process.env.SECRETKEY}`);
    req.userId = data.id;
    next();
  }
  catch (error) {
    return res.sendStatus(403);
  }
}

module.exports = isAuthenticated;
