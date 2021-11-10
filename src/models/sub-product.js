const mongoose = require("mongoose");
const subProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    subProductImage: { type: String },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubProduct", subProductSchema);
