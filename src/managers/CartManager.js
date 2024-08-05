import mongoose from "mongoose";
import cartModel from "./models/cart.model.js";

export default class CartManager {

    async getCarts() {
        try {
            return await cartModel.find();
        } catch (error) {
            console.error("Error getting carts:", error);
            throw new Error("Could not retrieve carts");
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
            return cart;
        } catch (error) {
            console.error("Error getting cart by ID:", error);
            throw new Error("Could not retrieve cart");
        }
    }

    async createCart() {
        try {
            const newCart = await cartModel.create({ products: [] });
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            throw new Error("Could not create cart");
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw new Error("Could not add product to cart");
        }
    }

    async updateProductInCart(cartId, productId, quantity) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                throw new Error("Product not found in cart");
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error updating product in cart:", error);
            throw new Error("Could not update product in cart");
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            cart.products = cart.products.filter(item => item.product.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error removing product from cart:", error);
            throw new Error("Could not remove product from cart");
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await this.getCartById(cartId);
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error clearing cart:", error);
            throw new Error("Could not clear cart");
        }
    }
}