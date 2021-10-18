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

// Method to get a product by its ID
module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Product.findById({ _id: id }));
  } catch (err) {
    res.status(500).json(err);
  }
};
