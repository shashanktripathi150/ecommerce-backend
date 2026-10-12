// Middleware to handle 404 Not Found for undefined routes
export const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Forwards error to the global errorHandler
};

// Centralized error handler
export const errorHandler = (err, req, res, next) => {
  // If status code is 200, default it to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Mongoose CastError (e.g., passing invalid ObjectId length/characters)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found: Invalid database ID format';
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};