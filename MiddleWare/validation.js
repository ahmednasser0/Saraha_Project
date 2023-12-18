import joi from "joi";
export const generalvalidation = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu", "eg"] },
    })
    .required(),
  password: joi.string().pattern(new RegExp()).required(),
  Cpassword: joi.string().required(),
  id: joi.string().min(24).max(24).required(),
  username: joi.string().required().min(3).max(25).alphanum().messages({
    "string.empty": "Please Enter a Username",
    "any.only": "Password doesn't Match Confirmation Password",
    "string.pattern.base": "Password Pattern doesn't match",
  }),
};

const validation = (schema) => {
  const validationArr = [];
  return (req, res, next) => {
    const dataMethods = ["body", "query", "params", "headers"];
    dataMethods.forEach((key) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationArr.push(validationResult.error.details);
        }
        if (validationArr.length > 0) {
          return res.json({ Message: "Validation Error", validationArr });
        } else {
          return next();
        }
      }
    });
  };
};

export default validation;
