const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  species: Joi.string()
    .valid("Dog", "Cat", "Rabbit", "Bird", "Horse", "Reptile")
    .required(),
  breed: Joi.string().min(2).max(60).required(),
  age: Joi.number().min(0).max(40).required(),
  gender: Joi.string().valid("Male", "Female").required(),
  size: Joi.string().valid("Small", "Medium", "Large").required(),
  image: Joi.string().uri().required(),
  description: Joi.string().min(5).max(5000).required(),
  city: Joi.string().min(2).max(80).required(),
  status: Joi.string().valid("available", "pending", "adopted").required(),
  vaccinated: Joi.boolean().required(),
  neutered: Joi.boolean().required(),
  contactName: Joi.string().min(2).max(60).required(),
  contactPhone: Joi.string().min(6).max(30).required(),
  contactEmail: Joi.string().email().required(),
});
