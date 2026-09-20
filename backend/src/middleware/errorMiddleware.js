// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Centralized Error Handling Middleware
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Not Found Handler
 * Catches requests to undefined routes
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler
 * Catches all errors and sends consistent JSON responses
 */
export const errorHandler = (err, req, res, next) => {
  // Determine status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Base error response
  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  };

  // Handle Supabase / PostgreSQL unique constraint violations
  if (err.code === '23505') {
    errorResponse.message = 'A record with this value already exists';
    return res.status(409).json(errorResponse);
  }

  // Handle Supabase / PostgreSQL not-null constraint violations
  if (err.code === '23502') {
    errorResponse.message = `Missing required field`;
    return res.status(400).json(errorResponse);
  }

  // JWT errors (from Clerk)
  if (err.name === 'JsonWebTokenError') {
    errorResponse.message = 'Invalid token';
    return res.status(401).json(errorResponse);
  }

  if (err.name === 'TokenExpiredError') {
    errorResponse.message = 'Token expired';
    return res.status(401).json(errorResponse);
  }

  // Log error for monitoring
  if (statusCode === 500) {
    console.error('❌ Internal Server Error:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors automatically
 *
 * Usage:
 *   router.get('/users', asyncHandler(async (req, res) => {
 *     const { data } = await supabase.from('users').select('*');
 *     res.json(data);
 *   }));
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
