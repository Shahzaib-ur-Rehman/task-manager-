const { CustomAPIErros } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIErros) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message,
    data: null,
  });
};

module.exports = errorHandlerMiddleware;
