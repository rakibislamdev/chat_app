const User = require("../models/userModel");

const userRegisterService = async (data) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByEmailService = async (email) => {
  try {
    return await User.findOne({ email });
    
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByIdService = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserService = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(error);
  }

};

module.exports = {
    userRegisterService,
    findUserByEmailService,
    findUserByIdService,
    updateUserService
}