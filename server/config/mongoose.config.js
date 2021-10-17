const mongoose = require("mongoose");
const localDataBase = "mongodb://localhost/product_manager_db";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(localDataBase);
}
