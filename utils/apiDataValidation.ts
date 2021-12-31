import * as Joi from "joi";

export const RegisterSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9 ]{3,30}$"))
    .min(2)
    .max(30)
    .required(),

  pass: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9#?!@$%^&*-]{3,30}$"))
    .required(),

  num: Joi.number().integer().min(5000000000).max(9999999999).required(),
});

export const LoginSchema = Joi.object({
  pass: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9#?!@$%^&*-]{3,30}$"))
    .required(),

  num: Joi.number().integer().min(5000000000).max(9999999999).required(),
});
