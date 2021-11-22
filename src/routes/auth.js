const express = require("express");
const { requireSignIn } = require("../common-middleware");
const router = express.Router();
const { signup, signin, signout, update } = require("../controllers/auth");
const {
  validateSignup,
  isRequestValidated,
  validateSignIn,
} = require("../vallidators/auth");

router.post("/signin", validateSignIn, isRequestValidated, signin);
router.post("/signup", validateSignup, isRequestValidated, signup);
router.post("/update", update);
router.post("/signout", requireSignIn, signout);
module.exports = router;
