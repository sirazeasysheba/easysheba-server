const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth");
const {
  validateSignup,
  isRequestValidated,
  validateSignIn,
} = require("../vallidators/auth");

router.post("/signin", validateSignIn, isRequestValidated, signin);
router.post("/signup", validateSignup, isRequestValidated, signup);
module.exports = router;
