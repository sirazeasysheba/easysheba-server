const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: String,
    trim: true,
  },
  house: {
    type: String,
    required: true,
    trim: true,
  },
  road: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  block: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  sector: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    min: 10,
    max: 100,
  },
  alternatePhone: {
    type: String,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
});

// B
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);
