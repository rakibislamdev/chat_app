const Joi = require("joi");
const commonValidation = require(".");

const userRegValidation = async (req, res, next) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().optional(),
    phone: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    address: Joi.string().optional(),
  }).options({
    abortEarly: false,
  });
  await commonValidation(schema, req, res, next);
};

const userLoginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    }).options({
        abortEarly: false,
    });
    await commonValidation(schema, req, res, next);
};

const userUpdateValidation = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().optional(),
        avatar: Joi.string().optional(),
        phone: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        address: Joi.string().optional(),
        status: Joi.string().optional(),
    }).options({
        abortEarly: false,
    });
    await commonValidation(schema, req, res, next);
};

const userDetailsValidation = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    }).options({
        abortEarly: false,
    });
    await commonValidation(schema, req, res, next);
};

module.exports = {
    userRegValidation,
    userLoginValidation,
    userUpdateValidation,
    userDetailsValidation
};
