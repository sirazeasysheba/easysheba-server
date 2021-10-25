const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { createProduct, getProductsBySlug } = require("../controllers/product");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
});
//Routes
router.post(
  "/product/create",
  requireSignIn,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

router.get("/products/:slug", getProductsBySlug);
module.exports = router;
