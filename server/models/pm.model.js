const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product requires a title"],
      unique: [true, "Repeated title forbidden"],
      minlength: [10, "10 characters min"],
      maxlength: [40, "40 characters max"],
    },
    price: {
      type: Number,
      required: [true, "Product must has a price"],
      min: [2, "2 digits min"],
    },
    description: {
      type: String,
      required: [true, "Product requires a description"],
      unique: [true, "Repeated description forbidden"],
      minlength: [10, "10 characters min"],
      maxlength: [80, "80 characters max"],
    },
  },
  { timestamps: true }
);

// Specifying a default custom error message by overriding the plugging default message
uniqueValidator.defaults.message =
  "/Production validation failed. The {PATH} has to be unique";
// Apply the uniqueValidator plugin to ProductSchema
ProductSchema.plugin(uniqueValidator);

// Converting the Schema into a Model
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
