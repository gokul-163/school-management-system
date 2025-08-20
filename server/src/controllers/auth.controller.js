import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
// controllers/authController.js

export const registerAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const newUser = new User({
      name: name || 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // Set token in cookie
    res.cookie(env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Also return token in response for client-side storage
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role,
        name: user.name 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get Current User
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Logout
export const logout = (req, res) => {
  // Clear the cookie
  res.clearCookie(env.COOKIE_NAME);
  res.json({ message: 'Logged out successfully' });
};
