const jwt = require("jsonwebtoken");

const generateAccessToken = async (user) => {
  return await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
};

const generateRefreshToken = async (user) => {
  return await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "29d",
  });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
