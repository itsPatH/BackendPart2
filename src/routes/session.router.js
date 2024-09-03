import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthService from "../services/AuthService.js";

const sessionsRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'Katys Secret';

sessionsRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.loginUser(email.toLowerCase());
        if (!user) {
            return res.status(401).send({ status: "error", error: "Invalid credentials" });
        }

        const isPasswordValid = await AuthService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ status: "error", error: "Invalid credentials" });
        }

        const userSession = {
            id: user._id,
            name: user.firstName,
            role: user.role,
        };

        const userToken = jwt.sign(userSession, JWT_SECRET, { expiresIn: "1d" });
        res.cookie('Katys Token', userToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.send({ status: "success", message: "Login was successful", token: userToken });
    } catch (error) {
        next(error);
    }
});

export default sessionsRouter;
