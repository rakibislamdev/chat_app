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

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    let tokenParts = token.split("Bearer ");
    if (tokenParts.length !== 2) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    tokenParts = tokenParts[1];

    const decoded = await jwt.verify(tokenParts, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
