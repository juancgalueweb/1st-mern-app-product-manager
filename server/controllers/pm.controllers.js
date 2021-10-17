const Product = require("../models/pm.model");

// Method to create a product
module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Method to get all the products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    res.json(err);
  }
};
