import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.mjs';
import { User } from '../models/userModels.mjs';

// Middleware to authenticate user
export const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized! No token provided" });
  }

  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Find user in database and attach it to request object
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // Move to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized! Token is invalid" });
  }
});

// Middleware to check if user is admin
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  
  return res.status(403).json({ message: "Not Authorized as an Admin" });  
};
