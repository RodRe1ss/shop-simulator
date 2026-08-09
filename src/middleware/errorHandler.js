const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err.name, statusCode, err.message);

  res.status(statusCode).json({
    error: err.message,
  });
};

module.exports = errorHandler;
