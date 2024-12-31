// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 
    
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY); 

   
    req.user = decoded;
    next(); 
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware
