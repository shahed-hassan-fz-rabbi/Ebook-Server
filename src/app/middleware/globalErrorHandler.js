const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default globalErrorHandler;