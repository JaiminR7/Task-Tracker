const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const protect = asyncHandler(async (req, res, next) => {
  // 1) Extract token from Authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access.', 401)
    );
  }

  // 2) Verify token signature
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }

  // 3) Retrieve user if still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token no longer exists.',
        401
      )
    );
  }

  // 4) Attach user to req.user context
  req.user = currentUser;
  next();
});

module.exports = { protect };
