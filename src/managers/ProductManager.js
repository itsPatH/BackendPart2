import mongoose from 'mongoose';
import productModel from "../db/models/product.model.js";

export default class ProductManager {

    async getProducts() {
        try {
            return await productModel.find();
        } catch (error) {
            console.error("Error getting products:", error);
            throw new Error("Could not retrieve products");
        }
    }

    async getProductById(productId) {
        try {
            const product = await productModel.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            console.error("Error getting product by ID:", error);
            throw new Error("Could not retrieve product");
        }
    }

    async createProduct(productData) {
        try {
            const newProduct = await productModel.create(productData);
            return newProduct;
        } catch (error) {
            console.error("Error creating product:", error);
            throw new Error("Could not create product");
        }
    }

    async updateProduct(productId, productData) {
        try {
            const updatedProduct = await productModel.updateOne({ _id: productId }, { $set: productData });
            if (updatedProduct.matchedCount === 0) {
                throw new Error("Product not found");
            }
            return updatedProduct;
        } catch (error) {
            console.error("Error updating product:", error);
            throw new Error("Could not update product");
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await productModel.deleteOne({ _id: productId });
            if (deletedProduct.deletedCount === 0) {
                throw new Error("Product not found");
            }
            return deletedProduct;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw new Error("Could not delete product");
        }
    }
}