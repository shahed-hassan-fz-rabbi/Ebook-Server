const sendResponse = (
  res,
  {
    statusCode = 200,
    success = true,
    message = "",
    data = null,
  }
) => {
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
  });
};

export default sendResponse;