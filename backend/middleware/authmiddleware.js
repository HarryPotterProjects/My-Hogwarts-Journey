const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err.message);
      return res.sendStatus(403);
    }
    req.user = user; // Attach user info to request
    console.log('Authenticated User:', req.user); // Debugging statement
    next();
  });
};


module.exports = authenticateToken;
