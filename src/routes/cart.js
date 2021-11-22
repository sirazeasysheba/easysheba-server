const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware");
const { addItemToCart, getCartItems } = require("../controllers/cart");
const router = express.Router();

//const { addCategory, getCategories } = require("../controllers/category");

//Routes
router.post(
  "/user/cart/addtocart",
  requireSignIn,
  userMiddleware,
  addItemToCart
);
router.post(
  "/user/cart/getcartitems",
  requireSignIn,
  userMiddleware,
  getCartItems
);

module.exports = router;
