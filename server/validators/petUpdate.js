const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(2).max(60),
  species: Joi.string().valid(
    "Dog",
    "Cat",
    "Rabbit",
    "Bird",
    "Horse",
    "Reptile"
  ),
  breed: Joi.string().allow("", null),
  age: Joi.number().integer().min(0).max(50),
  image: Joi.string().uri().allow("", null),
  description: Joi.string().max(2000),
}).min(1);
