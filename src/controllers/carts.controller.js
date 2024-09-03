import mongoose from 'mongoose';
import {
  CartService,
  ProductService,
  TicketService,
  UserService
} from '../services/services.js';
import getErrorDetails from '../services/errorService.js';
import { makeid } from '../utils.js';

const origin = 'cart';

const handleError = (res, errorCode) => {
  const { errorName, httpCode, message } = getErrorDetails(errorCode, origin);
  return res.status(httpCode).send({ status: 'error', error: errorName, message });
};

const create = async (req, res) => {
  try {
    const cart = await CartService.createCart();
    if (!cart) {
      return handleError(res, -1);
    }
    res.send({ status: 'success', message: 'Cart Created', cart });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { cid: cartId } = req.params;
  try {
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return handleError(res, -2);
    }
    res.send({ status: 'success', message: 'Cart found', cart });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

const addProduct = async (req, res) => {
  const { cid: cartId, pid: productId } = req.params;
  const quantity = parseInt(req.body.quantity, 10) || 1;

  if (quantity < 0) {
    return res.status(400).send({ status: 'error', error: 'Quantity cannot be a negative number' });
  }

  try {
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return handleError(res, -2);
    }

    const product = await ProductService.getProductById(productId);
    if (!product) {
      return handleError(res, -3);
    }

    const productInCart = cart.products.find(p => p.product.equals(productId));

    if (productInCart) {
      await CartService.updateById(
        { _id: cartId, 'products.product': productId },
        { $inc: { 'products.$.quantity': quantity } }
      );
    } else {
      await CartService.updateById(
        { _id: cartId },
        { $push: { products: { product: productId, quantity } } }
      );
    }

    const updatedCart = await CartService.getCartById(cartId);
    const populatedCart = await CartService.populate(updatedCart);

    res.send({ status: 'success', message: 'Product added successfully', cart: populatedCart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

const update = async (req, res) => {
  const { cid: cartId } = req.params;
  const updatedValues = req.body;

  if (!Array.isArray(updatedValues)) {
    return res.status(400).send({ status: 'error', error: 'Invalid data format' });
  }

  for (const product of updatedValues) {
    if (!product.quantity || typeof product.quantity !== 'number' || product.quantity < 0) {
      return res.status(400).send({ status: 'error', error: 'Invalid product format' });
    }

    if (!mongoose.Types.ObjectId.isValid(product.product)) {
      try {
        product.product = mongoose.Types.ObjectId(product.product);
      } catch (error) {
        console.error('Error converting product.id to ObjectId:', error);
        return res.status(400).send({ status: 'error', error: 'Invalid product format (id)' });
      }
    }
  }

  try {
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return handleError(res, -2);
    }

    const productIds = updatedValues.map(p => p.product);
    const products = await ProductService.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return handleError(res, -3);
    }

    const updatedCart = await CartService.updateById(
      { _id: cartId },
      { $set: { products: updatedValues } }
    );

    if (!updatedCart) {
      return handleError(res, -4);
    }

    const populatedCart = await CartService.populate(await CartService.getCartById(cartId));

    res.send({ status: 'success', message: 'Products in cart successfully updated', cart: populatedCart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

const deleteProductById = async (req, res) => {
  const { cid: cartId, pid: productId } = req.params;

  try {
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return handleError(res, -2);
    }

    const product = await ProductService.getProductById(productId);
    if (!product) {
      return handleError(res, -3);
    }

    const productInCart = cart.products.find(p => p.product.equals(productId));
    if (!productInCart) {
      return handleError(res, -5);
    }

    await CartService.updateById(
      { _id: cartId },
      { $pull: { products: { product: productId } } }
    );

    const updatedCart = await CartService.getCartById(cartId);
    const populatedCart = await CartService.populate(updatedCart);

    res.send({ status: 'success', message: 'Product deleted successfully', cart: populatedCart });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

const clear = async (req, res) => {
  const { cid: cartId } = req.params;

  try {
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return handleError(res, -2);
    }

    const result = await CartService.clearCart(cartId);

    res.send({ status: 'success', message: 'Cart cleaned successfully', cart: result });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

const purchase = async (req, res) => {
  const purchaserId = req.user.id;

  try {
    const purchaser = await UserService.getUser(purchaserId);
    if (!purchaser || !purchaser.email) {
      return res.status(404).send({ status: 'error', message: 'User not found' });
    }

    const cartId = req.params.cid;
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return handleError(res, -2);
    }

    const cartProducts = cart.products;
    const inStock = [];
    const outOfStock = [];

    for (const item of cartProducts) {
      const { product, quantity } = item;
      if (product.stock >= quantity) {
        inStock.push({
          id: product._id,
          total: product.price * quantity,
          quantity,
          stock: product.stock
        });
      } else {
        outOfStock.push({
          id: product._id,
          quantity,
          available: product.stock
        });
      }
    }

    if (outOfStock.length > 0) {
      return res.status(406).send({ status: 'error', message: 'Products out of stock', payload: outOfStock });
    }

    if (inStock.length === 0) {
      return res.status(406).send({ status: 'error', message: 'Cart is empty' });
    }

    const totalAmount = inStock.reduce((sum, product) => sum + product.total, 0);
    const purchaseInfo = {
      amount: totalAmount,
      purchaser: purchaser.email,
      purchase_datetime: new Date().toISOString(),
      code: makeid(25)
    };

    const ticket = await TicketService.create(purchaseInfo);

    for (const product of inStock) {
      const newStock = product.stock - product.quantity;
      const result = await ProductService.updateStock(product.id, newStock);
      if (result < 0) {
        return handleError(res, result);
      }
    }

    await CartService.clearCart(cartId);

    res.status(201).send({ status: 'success', message: 'Ticket created successfully', payload: ticket });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

export default {
  create,
  getById,
  addProduct,
  update,
  deleteProductById,
  clear,
  purchase
};