// validators/authValidators.js
import { body } from "express-validator";

export const registerValidation = [
  body("name", "Name is required").notEmpty(),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 })
];

export const loginValidation = [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password is required").notEmpty()
];
