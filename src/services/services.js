import UserRepository from "../repositories/UserRepository.js";
import UserDAO from "../db/DAO/userDAO.js";

import ProductRepository from "../repositories/ProductRepository.js";
import ProductDAO from "../db/DAO/productDAO.js";

import CartRepository from "../repositories/CartRepository.js";
import CartDAO from "../db/DAO/cartDAO.js";

import TicketRepository from "../repositories/TicketRepository.js";
import TicketDAO from "../db/DAO/ticketDAO.js";

export const UserService = new UserRepository(new UserDAO());
export const ProductService = new ProductRepository(new ProductDAO());
export const CartService = new CartRepository(new CartDAO());
export const TicketService = new TicketRepository(new TicketDAO());
