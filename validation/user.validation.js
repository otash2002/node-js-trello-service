import Joi from "joi";

export const createUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").default("user")
});

export const updateUserValidation = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  role: Joi.string().valid("user", "admin")
});
