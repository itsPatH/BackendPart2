import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthService from "../services/AuthService.js";

const sessionsRouter = Router();
const JWT_SECRET = 'Katys Secret'; // Usa una variable de entorno en producción

// Registro de usuario
sessionsRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await AuthService.registerUser({ firstName, lastName, email, password: hashedPassword });

        res.status(201).send({ status: "success", message: "Registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send({ status: "error", error: error.message });
    }
});

// Inicio de sesión
sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.loginUser(email);
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
        res.cookie('Katys Token', userToken, { httpOnly: true });
        res.send({ status: "success", message: "Login was successful", token: userToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(401).send({ status: "error", error: error.message });
    }
});

// Middleware para verificar el token
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

// Ruta para obtener el usuario actual
sessionsRouter.get('/current', authenticateJWT, (req, res) => {
    res.send(req.user);
});

// Ruta de cierre de sesión
sessionsRouter.get('/logout', (req, res) => {
    res.clearCookie('Katys Token');
    res.send({ status: "success", message: "Logged out successfully" });
});

export default sessionsRouter;
