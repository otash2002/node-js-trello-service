import Joi from "joi";

export const createTaskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(null, "").max(255),
  board_id: Joi.number().integer().required(),
  status: Joi.string().valid("todo", "doing", "done").default("todo")
});

export const updateTaskValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow(null, "").max(255),
  status: Joi.string().valid("todo", "doing", "done")
});
