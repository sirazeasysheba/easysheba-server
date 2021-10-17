const express = require("express");
const { requireSignIn } = require("../../common-middleware");
const router = express.Router();
const { signup, signin, signout } = require("../../controllers/admin/auth");
const {
  isRequestValidated,
  validateSignup,
  validateSignIn,
} = require("../../vallidators/auth");

router.post("/admin/signin", validateSignIn, isRequestValidated, signin);
router.post("/admin/signup", validateSignup, isRequestValidated, signup);
router.post("/admin/signout", requireSignIn, signout);
module.exports = router;
