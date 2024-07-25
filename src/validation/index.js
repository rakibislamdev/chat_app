const httpStatus = require("http-status");
const { errorResponse } = require("../config/response");

const commonValidation = async (schema, req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error) {
      // on fail return comma separated errors
      const errorMessage = error.details.map((details) => {
        return { [details.context.key]: details.message };
      });
      return errorResponse({ res, message: "Input validation failed", code: httpStatus.BAD_REQUEST, errors: errorMessage });
    }
  }
};

module.exports = commonValidation;