import { check, validationResult } from "express-validator";

const validateUser = (method) => {
  switch (method) {
    case "login":
      return [
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").notEmpty().withMessage("Password is required"),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
    case "signup":
      return [
        check("name").notEmpty().withMessage("Name is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
    case "forgotPassword":
      return [
        check("email").isEmail().withMessage("Valid email is required"),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
    case "resetPassword":
      return [
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
    case "updateUser":
      return [
        check("name").optional().notEmpty().withMessage("Name cannot be empty"),
        check("email").optional().isEmail().withMessage("Valid email is required"),
        check("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        check("phoneNumber").optional().isMobilePhone().withMessage("Valid phone number is required"),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
    default:
      return (req, res, next) => next();
  }
};

export default validateUser;
