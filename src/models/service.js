const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    priceRange: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    information: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    rating: {
      type: String,
    },
    serviceImage: { type: String },
    parentId: {
      type: String,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Service", serviceSchema);
