import * as Joi from "joi";

export const RegisterSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9 ]{3,40}$"))
    .min(2)
    .max(40)
    .required(),

  pass: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9 #?!@$%^&*-]{8,40}$"))
    .required(),

  num: Joi.number().integer().min(5000000000).max(9999999999).required(),
});

export const LoginSchema = Joi.object({
  pass: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9#?!@$%^&*-]{8,40}$"))
    .required(),

  num: Joi.number().integer().min(5000000000).max(9999999999).required(),
});

export const TransferSchema = Joi.object({
  num_from: Joi.number().integer().min(5000000000).max(9999999999).required(),
  num_to: Joi.number().integer().min(5000000000).max(9999999999).required(),
  amount: Joi.number().integer().min(1).required(),
});
