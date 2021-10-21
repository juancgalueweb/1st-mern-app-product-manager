const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteOneProduct,
  updateProduct,
} = require("../controllers/pm.controllers");

module.exports = (app) => {
  app.post("/api/product/new", createProduct);
  app.get("/api/products/getAll", getAllProducts);
  app.get("/api/products/:id", getProductById);
  app.delete("/api/product/delete/:id", deleteOneProduct);
  app.put("/api/product/edit/:id", updateProduct);
};
