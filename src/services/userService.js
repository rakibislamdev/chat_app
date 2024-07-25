const User = require("../models/userModel");

const userRegisterService = async (data) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
    userRegisterService,
}