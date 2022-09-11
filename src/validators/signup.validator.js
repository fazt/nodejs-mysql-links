import { body } from "express-validator";

export const signupSchema = [
    body("fullname").isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters long"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password1").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("password2").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]