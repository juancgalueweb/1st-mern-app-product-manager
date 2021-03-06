const Product = require("../models/pm.model");

// Method to create a product
module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.json(newProduct);
  } catch (err) {
    const errorMsg = Object.values(err.errors).map((val) => val.message);
    res.status(500).json(errorMsg);
  }
};

// Method to get all the products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    res.status(500).json(err);
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

// Method to delete a product by ID
module.exports.deleteOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });
    return res.json({ message: "The product was deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to update a product by ID
module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    return res.json(
      await Product.findOneAndUpdate({ _id: id }, body, {
        new: true,
        runValidators: true,
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
