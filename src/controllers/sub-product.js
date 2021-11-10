const SubProduct = require("../models/sub-product");
const shortId = require("shortid");

exports.createSubProduct = (req, res) => {
  const { name, price, details, productType } = req.body;
  if (req.file) {
    subProductImage = process.env.API + "/public/" + req.file.filename;
  }
  //   let productPictures = [];
  //   if (req.files.length > 0) {
  //     productPictures = req.files.map((file) => {
  //       return { img: file.filename };
  //     });
  //   }
  const subProduct = new SubProduct({
    name,
    price,
    details,
    productType,
    subProductImage,
    createdBy: req.user._id,
  });
  subProduct.save((error, subProduct) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (subProduct) {
      res.status(201).json({ subProduct });
    }
  });
};
