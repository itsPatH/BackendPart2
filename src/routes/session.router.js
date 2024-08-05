import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthService from "../services/AuthService.js";

const sessionsRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'Katys Secret';

const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send({ status: "error", message: err.message || "Internal Server Error" });
};

const validateUserInput = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send({ status: "error", error: "All fields are required." });
    }
    next();
};

sessionsRouter.post('/register', validateUserInput, async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await AuthService.registerUser({ firstName, lastName, email: email.toLowerCase(), password: hashedPassword }); // Asegúrate de que el email esté en minúsculas
        res.status(201).send({ status: "success", message: "Registered successfully", user: newUser });
    } catch (error) {
        next(error);
    }
});

sessionsRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.loginUser(email.toLowerCase()); // Asegúrate de que el email esté en minúsculas
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
        res.cookie('Katys Token', userToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Asegúrate de usar la opción 'secure' en producción
        res.send({ status: "success", message: "Login was successful", token: userToken });
    } catch (error) {
        next(error); 
    }
});

const authenticateJWT = (req, res, next) => {
    const token = req.cookies['Katys Token'];

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

sessionsRouter.get('/current', authenticateJWT, (req, res) => {
    res.send({ status: "success", user: req.user });
});

sessionsRouter.get('/logout', (req, res) => {
    res.clearCookie('Katys Token');
    res.send({ status: "success", message: "Logged out successfully" });
});

sessionsRouter.use(errorHandler);

export default sessionsRouter;