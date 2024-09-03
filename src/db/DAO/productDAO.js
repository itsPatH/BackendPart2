import productModel from "../models/product.model";

export default class ProductDAO {
  async getAll() {
    try {
      return await productModel.find();
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  }

  async getById(id) {
    try {
      return await productModel.findById(id);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }

  async create(productData) {
    try {
      return await productModel.create(productData);
    } catch (error) {
      console.error("Error creating product:", error);
      return -1;
    }
  }

  async updateById(id, updateData) {
    try {
      return await productModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  }
}
