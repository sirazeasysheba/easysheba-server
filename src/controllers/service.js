const slugify = require("slugify");
const Service = require("../models/service");
const shortid = require("shortid");

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
      serviceImage: serve.categoryImage,
      parentId: serve.parentId,
      category: serve.category,
      children: createServices(services, serve._id),
    });
  }
  return serviceList;
};

exports.addService = (req, res) => {
  const serviceObj = {
    name: req.body.name,
    category: req.body.category,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };
  if (req.file) {
    serviceObj.serviceImage = process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    serviceObj.parentId = req.body.parentId;
  }
  const serve = new Service(serviceObj);
  serve.save((error, service) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (service) {
      return res.status(201).json({ service });
    }
  });
};

exports.getServices = (req, res) => {
  Service.find({}).exec((error, services) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (services) {
      const serviceList = createServices(services);
      return res.status(200).json({ serviceList });
    }
  });
};

// exports.updateCategories = async (req, res) => {
//   const { _id, name, parentId, type } = req.body;
//   const updatedCategories = [];
//   if (name instanceof Array) {
//     for (let i = 0; i < name.length; i++) {
//       const category = {
//         name: name[i],
//         type: type[i],
//       };
//       if (parentId[i] !== "") {
//         category.parentId = parentId[i];
//       }
//       const updatedCategory = await Category.findOneAndUpdate(
//         { _id: _id[i] },
//         category,
//         { new: true }
//       );
//       updatedCategories.push(updatedCategory);
//     }
//     return res.status(201).json({ updatedCategories });
//   } else {
//     const category = {
//       name,
//       type,
//     };
//     if (parentId !== "") {
//       category.parentId = parentId;
//     }
//     const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
//       new: true,
//     });
//     return res.status(201).json({ updatedCategory });
//   }
// };
// exports.deleteCategories = async (req, res) => {
//   const { ids } = req.body.payload;
//   const deletedCategories = [];
//   for (let i = 0; i < ids.length; i++) {
//     const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
//     deletedCategories.push(deleteCategory);
//   }
//   if (deletedCategories.length === ids.length) {
//     res.status(201).json({ message: "Categories Removed" });
//   } else {
//     res.status(400).json({ message: "Something went wrong!!" });
//   }
// };
