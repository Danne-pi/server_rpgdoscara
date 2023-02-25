import joi from "joi";

export const userSchema = joi.object({
  code: joi.string().required().min(3).max(16),
  username: joi.string().required().min(3).max(25),
  password: joi.string().required().min(8).max(25),
});

export const userLogSchemma = joi.object({
  username: joi.string().required().min(3).max(25),
  password: joi.string().required().min(8).max(25),
});
