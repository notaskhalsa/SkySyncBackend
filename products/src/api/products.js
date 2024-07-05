const ProductService = require("../services/product-service");
const { PublishCustomerEvents, PublishShoppingEvents } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ProductService();

  // Get top products and category
  app.get("/getProducts", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.post("/create", async (req, res, next) => {
    try {
      const { name, desc, category, unit, price, available, suplier, img } = req.body;
      // validation
      const { data } = await service.CreateProduct({ name, desc, category, unit, price, available, suplier, img });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:category", async (req, res, next) => {
    const category = req.params.category;
    try {
      const { data } = await service.GetProductsByCategory(category);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  // TODO: Differnt get req here, change in frontend
  app.get("/find/:id", async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  // TODO: Differnt get req here, change in frontend
  app.post("/find/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  app.put("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await service.GetProductPayload(_id, { productId: req.body._id }, "ADD_TO_WISHLIST");
      PublishCustomerEvents(data);
      return res.status(200).json(data.data.product);
    } catch (err) {}
  });

  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductPayload(_id, { productId: req.body._id }, "REMOVE_FROM_WISHLIST");
      PublishCustomerEvents(data);
      return res.status(200).json(data.data.product);
    } catch (err) {
      next(err);
    }
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    // console.log("this is id", _id)

    try {
      // console.log(req.body)
      const { data } = await service.GetProductPayload(_id, { productId: req.body._id, qty: req.body.qty }, "ADD_TO_CART");
      // console.log("this is data", data)
      // console.log("publishcustomer")
      PublishCustomerEvents(data);
      PublishShoppingEvents(data);
      const response = {
        product: data.data.product,
        unit: data.data.qty,
      };
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id

    try {
      const { data } = await service.GetProductPayload(_id, {productId}, "REMOVE_FROM_CART");

      PublishCustomerEvents(data)
      PublishShoppingEvents(data)

      const response = {
        product: data.data.product,
        unit: data.data.qty,
      };      
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });
};
