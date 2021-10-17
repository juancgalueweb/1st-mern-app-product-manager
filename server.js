const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

//Using CORS
app.use(cors());

//Mongoose config
require("./server/config/mongoose.config");

//Access POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Calling the routes
require("./server/routes/pm.routes")(app);

//Using the port
app.listen(port, () =>
  console.log(`CORS-enabled web server listening on port ${port}`)
);
