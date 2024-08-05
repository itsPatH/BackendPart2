import UsersManager from "./UsersManager.js";
import ProductManager from "./"


export const usersService = new UsersManager();
export const productsService = new ProductManager();
export const cartService = new CartManager();