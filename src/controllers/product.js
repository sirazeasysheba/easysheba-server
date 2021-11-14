const Product = require("../models/product");
const Service = require("../models/service");

exports.createProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    service: req.body.service,
    createdBy: req.user._id,
  });
  console.log(product);
  product.save((error, product) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getProductsByService = (req, res) => {
  const { service } = req.body;
  Service.findOne({ service: service })
    .select("_id")
    .exec((error, service) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (service) {
        Product.find({ service: service._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }
          if (products.length > 0) {
            res.status(200).json({
              products,
            });
          }
        });
      }
    });
};

exports.updateProduct = async (req, res) => {
  const { _id, name, price } = req.body;
  console.log(req.body);
  const product = {
    name,
    price,
  };
  const updatedProduct = await Product.findOneAndUpdate({ _id }, product, {
    new: true,
  }).exec((error, updatedProduct) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (updatedProduct) {
      res.status(201).json({ updatedProduct });
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.body.payload;
  const deleteProduct = await Product.findOneAndDelete(id, function (error) {
    if (error) {
      res.status(400).json({ message: "Something went wrong!!" });
    } else {
      res.status(201).json({ message: "Services Removed" });
    }
  });
};
