const handleCastError = () => ({
  statusCode: 400,
  message: 'Invalid Task ID',
  errors: null,
});

const handleValidationError = (error) => ({
  statusCode: 400,
  message: 'Validation Failed',
  errors: Object.values(error.errors).map((validationError) => validationError.message),
});

const handleDuplicateKeyError = (error) => {
  const duplicateFields = error.keyValue ? Object.keys(error.keyValue) : [];

  return {
    statusCode: 400,
    message: 'Duplicate Key Error',
    errors: duplicateFields.length ? duplicateFields : null,
  };
};

const errorMiddleware = (err, req, res, next) => {
  let normalizedError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
    errors: null,
  };

  if (err.name === 'CastError') {
    normalizedError = handleCastError();
  } else if (err.name === 'ValidationError') {
    normalizedError = handleValidationError(err);
  } else if (err.code === 11000) {
    normalizedError = handleDuplicateKeyError(err);
  }

  res.status(normalizedError.statusCode).json({
    success: false,
    message: normalizedError.message,
    errors: normalizedError.errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorMiddleware;