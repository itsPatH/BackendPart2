import CartDAO from "../db/DAO/cartDAO.js";

export class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
    }

    async getAllCarts() {
        try {
            return await this.cartDAO.get();
        } catch (error) {
            throw new Error(`Error getting all carts: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await this.cartDAO.getOne({ _id: cartId });
            if (!cart) throw new Error('Cart not found');
            return cart;
        } catch (error) {
            throw new Error(`Error getting cart by ID: ${error.message}`);
        }
    }

    async createCart() {
        try {
            return await this.cartDAO.create();
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productData) {
        try {
            return await this.cartDAO.updateOne(
                { _id: cartId },
                { $push: { products: productData } }
            );
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            return await this.cartDAO.updateOne(
                { _id: cartId, "products.product": productId },
                { $set: { "products.$.quantity": quantity } }
            );
        } catch (error) {
            throw new Error(`Error updating product quantity: ${error.message}`);
        }
    }

    async updateCartProducts(cartId, products) {
        try {
            return await this.cartDAO.updateOne(
                { _id: cartId },
                { $set: { products } }
            );
        } catch (error) {
            throw new Error(`Error updating cart products: ${error.message}`);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            return await this.cartDAO.updateOne(
                { _id: cartId },
                { $pull: { products: { product: productId } } }
            );
        } catch (error) {
            throw new Error(`Error removing product from cart: ${error.message}`);
        }
    }

    async clearCart(cartId) {
        try {
            return await this.cartDAO.updateOne(
                { _id: cartId },
                { $set: { products: [] } }
            );
        } catch (error) {
            throw new Error(`Error clearing cart: ${error.message}`);
        }
    }

    async purchaseCart(cartId) {
        try {
            const cart = await this.cartDAO.getOne({ _id: cartId });
            if (!cart) throw new Error('Cart not found');
            // Implement purchase logic here
            return cart;
        } catch (error) {
            throw new Error(`Error purchasing cart: ${error.message}`);
        }
    }
}
