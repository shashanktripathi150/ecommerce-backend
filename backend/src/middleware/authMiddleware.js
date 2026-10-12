import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes: Ensures the incoming request has a valid Bearer token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User belonging to this token no longer exists' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Admin middleware: Verifies if the authenticated user has admin privileges
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Pass control to the controller
  } else {
    res.status(403).json({ message: 'Access denied: Requires administrator privileges' });
  }
};