import UsersManager from "./UsersManager.js";
import ProductManager from "./ProductManager.js"


export const usersService = new UsersManager();
export const productsService = new ProductManager();
export const cartService = new CartManager();