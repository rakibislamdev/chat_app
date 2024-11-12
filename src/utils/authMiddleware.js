const httpStatus = require("http-status");
const { errorResponse } = require("../helpers/response");
const { verifyToken } = require("../helpers/token");

const jwtMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return errorResponse({
            res,
            message: "Unauthorized",
            code: httpStatus.UNAUTHORIZED,
        })
    }
    try {
        let tokenParts = token.split("Bearer ");
        if (tokenParts.length !== 2) {
            return errorResponse({
                res,
                message: "Unauthorized",
                code: httpStatus.UNAUTHORIZED,
            });
        }
        tokenParts = tokenParts[1];
        const decoded = await verifyToken(tokenParts);
        req.user = decoded;
        next();
    } catch (error) {
        return errorResponse({
            res,
            message: "Unauthorized",
            code: httpStatus.UNAUTHORIZED,
        });
    }
}

module.exports = jwtMiddleware;