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
  breed: Joi.string().min(2).max(60),
  age: Joi.number().min(0).max(40),
  gender: Joi.string().valid("Male", "Female"),
  size: Joi.string().valid("Small", "Medium", "Large"),
  image: Joi.string().uri(),
  description: Joi.string().min(5).max(5000),
  city: Joi.string().min(2).max(80),
  status: Joi.string().valid("available", "pending", "adopted"),
  vaccinated: Joi.boolean(),
  neutered: Joi.boolean(),
  contactName: Joi.string().min(2).max(60),
  contactPhone: Joi.string().min(6).max(30),
  contactEmail: Joi.string().email(),
}).min(1);
