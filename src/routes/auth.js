const express = require("express");
const { requireSignIn } = require("../common-middleware");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
const {
  validateSignup,
  isRequestValidated,
  validateSignIn,
} = require("../vallidators/auth");

router.post("/signin", validateSignIn, isRequestValidated, signin);
router.post("/signup", validateSignup, isRequestValidated, signup);
router.post("/signout", requireSignIn, signout);
module.exports = router;
