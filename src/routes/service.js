const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const router = express.Router();

const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const {
  addService,
  getServices,
  updateServices,
  deleteServices,
} = require("../controllers/service");

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
  "/service/create",
  requireSignIn,
  adminMiddleware,
  upload.single("serviceImage"),
  addService
);

router.get("/service/getservice", getServices);
router.post("/service/update", upload.array("serviceImage"), updateServices);
router.post("/service/delete", deleteServices);
module.exports = router;
 