const Category = require("../../models/category");
const Product = require("../../models/product");
const Service = require("../../models/service");
const User = require("../../models/auth");
const Order = require("../../models/order");
const UserAddress = require("../../models/address");

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      type: cate.type,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
};

const createServices = (services, parentId = null) => {
  const serviceList = [];
  let service;
  if (parentId == null) {
    service = services.filter((cat) => cat.parentId == undefined);
  } else {
    service = services.filter((cat) => cat.parentId == parentId);
  }
  for (let serve of service) {
    serviceList.push({
      _id: serve._id,
      name: serve.name,
      slug: serve.slug,
      priceRange: serve.priceRange,
      information: serve.information,
      details: serve.details,
      rating: serve.rating,
      serviceImage: serve.categoryImage,
      parentId: serve.parentId,
      category: serve.category,
      children: createServices(services, serve._id),
    });
  }
  return serviceList;
};

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name price type info")
    .populate({ path: "service", select: "_id name" })
    .exec();
  const services = await Service.find({})
    .populate({ path: "category", select: "_id name" })
    .exec();
  const users = await User.find({ role: "user" }).exec();
  const orders = await Order.find({})
    .populate({ path: "items.productId", select: "name" })
    // .populate({ path: "user", select: "name " })
    .exec();
  const addresses = await UserAddress.find({}).exec();
  console.log(addresses);
  res.status(200).json({
    categories: createCategories(categories),
    products,
    services: createServices(services),
    users,
    orders,
    addresses,
  });
};
