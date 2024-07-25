module.exports = {
    successResponse: ({ res, message, data = null, code = 200 }) => {
      return res.status(code).json({
        status: code,
        success: true,
        message,
        ...(data && { data }),
      });
    },
    successResponseWithToken: ({ res, message, data = null, accessToken, refreshToken, code = 200 }) => {
        return res.status(code).json({
            status: code,
            success: true,
            message,
            accessToken,
            refreshToken,
            ...(data && { data }),
        });
    },
    errorResponse: ({ res, message, code, errors = null }) => {
      return res.status(code).json({
        status: code,
        success: false,
        message,
        ...(errors && { errors }),
      });
    },
  };
  