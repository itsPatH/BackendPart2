import cartModel from "../models/cart.model";

export default class CartDAO {
  async get() {
    try {
      return await cartModel.find();
    } catch (error) {
      console.error("Error fetching carts:", error);
      return null;
    }
  }

  async getOne(params) {
    try {
      const cart = await cartModel.findOne(params);
      return cart ? this.populate(cart, "products.product") : null;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  }

  async find(params, operation) {
    try {
      return await cartModel.find(params, operation);
    } catch (error) {
      console.error("Error finding carts:", error);
      return null;
    }
  }

  async create() {
    try {
      return await cartModel.create({ products: [] });
    } catch (error) {
      console.error("Error creating cart:", error);
      return -1;
    }
  }

  async populate(data, operation) {
    try {
      return data.populate(operation);
    } catch (error) {
      console.error("Error populating data:", error);
      return null;
    }
  }

  async updateOne(params, operation) {
    try {
      return await cartModel.findOneAndUpdate(params, operation, { new: true });
    } catch (error) {
      console.error("Error updating cart:", error);
      return null;
    }
  }
}
