const express = require("express");
const {
  requireSignIn,
  userMiddleware,
  adminMiddleware,
} = require("../common-middleware");
const {
  addAddress,
  getAddress,
  getAllAddresses,
} = require("../controllers/address");
const router = express.Router();
//Routes
router.post("/user/address/create", requireSignIn, userMiddleware, addAddress);
router.post("/user/getaddress", requireSignIn, userMiddleware, getAddress);
router.post(
  "/admin/getaddress",
  requireSignIn,
  adminMiddleware,
  getAllAddresses
);

module.exports = router;
