const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    throw new Error(error);
  }
};

const comparePassword = async (password, hashPass) => {
    try {
        const match = await bcrypt.compare(password, hashPass);
        return match;
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = {
    hashPassword,
    comparePassword
}