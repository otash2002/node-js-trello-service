import Joi from "joi";

export const createBoardValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(null, "").max(255)
});

export const updateBoardValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow(null, "").max(255)
});
