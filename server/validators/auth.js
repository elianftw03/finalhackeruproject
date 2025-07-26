const Joi = require("joi");

exports.register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).{8,}$/)
    .required(),
  role: Joi.string().valid("regular", "shelter", "admin").default("regular"),
  location: Joi.string().allow(""),
});

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
