import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    console.log(errors);
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const signupValidator = [
  body("username")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username should contain 4 to 20 characters"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 characters"),
  // optional() means the field can be omitted. Passing empty string is not omit.
  // so email receiving empty string is not allowed
  // trim() modifies the variable, not just checking
  // passing spaces to firstname and lastname will be recorded as empty string
  // so trim the string at frontend first, don't include the variable if it's empty
  body("email").optional().trim().isEmail(),
  body("firstname").optional().trim(),
  body("lastname").optional().trim(),
];
//
export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];
