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
      information: serve.information,
      priceRange: serve.priceRange,
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

exports.addService = (req, res) => {
  const serviceObj = {
    name: req.body.name,
    category: req.body.category,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    information: req.body.information,
    priceRange: req.body.priceRange,
    details: req.body.details,
    rating: req.body.rating,
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

exports.updateServices = async (req, res) => {
  const {
    _id,
    name,
    parentId,
    information,
    details,
    rating,
    category,
    priceRange,
  } = req.body;

  const updatedServices = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const service = {
        name: name[i],
        information: information[i],
        details: details[i],
        rating: rating[i],
        category: category[i],
        priceRange: priceRange[i],
      };
      if (parentId[i] !== "") {
        service.parentId = parentId[i];
      }
      const updatedService = await Service.findOneAndUpdate(
        { _id: _id[i] },
        service,
        { new: true }
      );
      updatedServices.push(updatedService);
    }
    return res.status(201).json({ updatedServices });
  } else {
    const service = {
      name,
      information,
      details,
      rating,
      category,
      priceRange,
    };
    if (parentId !== "") {
      service.parentId = parentId;
    }
    const updatedService = await Service.findOneAndUpdate({ _id }, service, {
      new: true,
    });
    return res.status(201).json({ updatedService });
  }
};
exports.deleteServices = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedServices = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteService = await Service.findOneAndDelete({ _id: ids[i]._id });
    deletedServices.push(deleteService);
  }
  if (deletedServices.length === ids.length) {
    res.status(201).json({ message: "Services Removed" });
  } else {
    res.status(400).json({ message: "Something went wrong!!" });
  }
};
