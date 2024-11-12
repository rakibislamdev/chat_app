const Joi = require("joi");
const commonValidation = require(".");

const messageValidation = async (req, res, next) => {
    const schema = Joi.object({
        sender: Joi.string().required(),
        receiver: Joi.string().required(),
        content: Joi.string().optional(),
        attachment: Joi.string().optional(),
    }).options({
        abortEarly: false,
    });
    await commonValidation(schema, req, res, next);
};

module.exports = {
    messageValidation,
};