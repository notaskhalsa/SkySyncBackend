const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async getCart(_id) {
    try {
      const cartItems = await this.repository.Cart(_id);

      return FormateData(cartItems);
    } catch (err) {
      throw err;
    }
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      console.log(`id = ${_id} and txnNumber is ${txnNumber}`)
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      console.log("this is order result",orderResult)
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async ManageCart(customerId, item, qty, isRemove) {
    try {
      const cartResults = await this.repository.AddCartItem(customerId, item, qty, isRemove);
      return FormateData(cartResults);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { userId, product, order, qty } = data;
    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }

  async GetOrderPayload(userId, order, event) {
    if (order) {
      const payload = {
        event: event,
        data: { userId, order },
      };
      return FormateData(payload);
    } else {
      return FormateData({ error: "No Order is available" });
    }
  }
}
module.exports = ShoppingService;