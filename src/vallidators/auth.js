const { check, validationResult } = require("express-validator");
exports.validateSignup = [
  check("name").notEmpty().withMessage("Name is required!"),
  check("username").notEmpty().withMessage("User name is required!"),
  check("email").isEmail().withMessage("Valid email is required!"),
  check("contactNumber")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone Number must be 11 digits!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters!"),
];
exports.validateSignIn = [
  check("email").isEmail().withMessage("Valid email is required!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters!"),
];
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
