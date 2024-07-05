const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { ProductModel } = require("./database/models");

const StartServer = async () => {
  const app = express();

  // console.log(ProductModel);
  await databaseConnection();
  // console.log(ProductModel);

  await expressApp(app);
  // console.log(ProductModel);

  // app.get("/", (req, res) => {
  //   // console.log(ProductModel.find());
  //   ProductModel.find()
  //     .lean()
  //     .exec(function (err, products) {
  //       return res.json(products);
  //     });
  // });
  
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
