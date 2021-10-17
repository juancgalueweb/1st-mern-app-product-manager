const {
  createProduct,
  getAllProducts,
} = require("../controllers/pm.controllers");

module.exports = (app) => {
  app.post("/api/product/new", createProduct);
  app.get("/api/products", getAllProducts);
};
