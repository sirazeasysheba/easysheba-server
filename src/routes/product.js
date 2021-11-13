const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");
const router = express.Router();
//Routes
router.post("/product/create", requireSignIn, adminMiddleware, createProduct);

// router.get("/products/:slug", getProductsBySlug);
router.post("/product/delete", requireSignIn, adminMiddleware, deleteProduct);
router.post("/product/update", requireSignIn, adminMiddleware, updateProduct);
module.exports = router;
