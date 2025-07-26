const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().required(),
  breed: Joi.string().allow(""),
  age: Joi.number().min(0),
  size: Joi.string().allow(""),
  gender: Joi.string().allow(""),
  description: Joi.string().allow(""),
  image: Joi.string().uri().required(),
});
