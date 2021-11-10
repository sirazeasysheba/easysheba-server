const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const { createSubProduct } = require("../controllers/sub-product");
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
  "/subproduct/create",
  requireSignIn,
  adminMiddleware,
  upload.single("subProductImage"),
  createSubProduct
);

module.exports = router;
