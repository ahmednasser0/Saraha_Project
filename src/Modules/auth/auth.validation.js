import joi from "joi";
import { generalvalidation } from "../../../MiddleWare/validation.js";

export const SignupSchema = {
  body: joi
    .object({
      username: generalvalidation.username,
      email: generalvalidation.email,
      password: joi.string().pattern(new RegExp()).required(),
      Cpassword: joi.string().valid(joi.ref("password")).required(),
      age: joi.number().integer().min(18).required(),
      gender: joi.string().valid("male", "female", "Male", "Female").required(),
      address: joi.string(),
      // favsubject: joi.array().items(
      //   joi.object({
      //     name: joi.string().required(),
      //     hours: joi.number().integer().min(2).max(5).required(),
      //   })
      // ),
    })
    .required(),
};

export const LoginSchema = {
  body: joi
    .object({
      email: generalvalidation.email,
      password: generalvalidation.password,
    })
    .required(),
};
