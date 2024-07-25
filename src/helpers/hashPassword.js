const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
    hashPassword,
}