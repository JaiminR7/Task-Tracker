const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

// Helper function to sign JWT tokens
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Helper function to format and send JWT token responses
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from user payload for client safety
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user,
    },
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // 1) Validate required fields
  if (!name || !email || !password) {
    return next(new AppError('Please provide name, email, and password', 400));
  }

  // 2) Validate password length explicitly
  if (password.length < 8) {
    return next(new AppError('Password must be at least 8 characters long', 400));
  }

  // 3) Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // 4) Create user (pre-save hook hashes password)
  const newUser = await User.create({
    name,
    email,
    password,
  });

  createSendToken(newUser, 201, res);
});

// @desc    Authenticate user and get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Validate credentials inputs
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Fetch user and select hashed password explicitly
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Generate token and send response
  createSendToken(user, 200, res);
});

// @desc    Get currently logged in user profile
// @route   GET /api/auth/profile
// @access  Protected
const getProfile = asyncHandler(async (req, res, next) => {
  // req.user has already been attached by the protect middleware
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

module.exports = {
  register,
  login,
  getProfile,
};
