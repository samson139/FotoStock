require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware for protected routes
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Controller for checking user login status
const verifyAuth = (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: "Invalid token" });
  }
};

module.exports = { requireAuth, verifyAuth };
