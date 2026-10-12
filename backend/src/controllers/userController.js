import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user & return token
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if required fields exist
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // 2. Check if user already exists with this email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // 3. Create new user document (password gets hashed automatically via pre-save hook)
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

// @desc    Authenticate user & return token (Login)
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });

    // 3. Verify user and match password using our custom model method
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error.message 
    });
  }
};

// @desc    Get user profile data
// @route   GET /api/users/profile
// @access  Private (Requires Token)
export const getUserProfile = async (req, res) => {
  try {
    // req.user was already populated by our protect middleware
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error retrieving profile', 
      error: error.message 
    });
  }
};