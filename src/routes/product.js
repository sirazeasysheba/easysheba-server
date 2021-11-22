const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  deleteProduct,
  updateProduct,
  getProductsByService,
  getProducts,
} = require("../controllers/product");
const router = express.Router();
//Routes
router.post("/product/create", requireSignIn, adminMiddleware, createProduct);
router.post("/product/delete", requireSignIn, adminMiddleware, deleteProduct);
router.post("/product/update", requireSignIn, adminMiddleware, updateProduct);
router.post("/product/getproductbyservice", getProductsByService);
router.get("/product/getproducts", getProducts);
module.exports = router;
