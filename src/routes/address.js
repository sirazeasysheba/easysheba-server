const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware");
const { addAddress, getAddress } = require("../controllers/address");
const router = express.Router();
//Routes
router.post("/user/address/create", requireSignIn, userMiddleware, addAddress);
router.post("/user/getaddress", requireSignIn, userMiddleware, getAddress);

module.exports = router;
