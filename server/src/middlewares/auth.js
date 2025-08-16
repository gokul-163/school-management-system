import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

export function auth(required = true) {
  return async (req, res, next) => {
    try {
      const token = req.cookies[env.COOKIE_NAME];
      if (!token) {
        if (required) return res.status(401).json({ success: false, message: 'Unauthorized' });
        req.user = null; return next();
      }
      const payload = jwt.verify(token, env.JWT_SECRET);
      const user = await User.findById(payload.id).select('-password');
      if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
      req.user = user; next();
    } catch (e) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
}

export function hasRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
}
