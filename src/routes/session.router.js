import { Router } from "express";
import AuthService from "../services/AuthService.js";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post('/register', passport.authenticate('register', {
    failureRedirect: '/api/sessions/registerFail',
    failureMessage: true
}), async (req, res) => {
    res.send({ status: "success", message: "Registered successfully" });
});

sessionsRouter.get('/registerFail', (req, res) => {
    console.error("Registration failed:", req.session.messages);
    res.status(400).send({ status: "error", error: "Registration failed" });
});

sessionsRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/sessions/failureLogin',
    failureMessage: true
}), async (req, res) => {
    res.send({ status: "success", message: "Logged in successfully" });
});

sessionsRouter.get('/failureLogin', (req, res) => {
    console.error("Login failed:", req.session.messages);
    if (req.session.messages.length > 4) {
        return res.status(429).send({ status: "error", error: "Exceeded number of failed attempts" });
    }
    res.status(401).send({ status: "error", error: "Login failed" });
});

// Obtener usuario actual
sessionsRouter.get('/current', async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ status: "error", error: "Not logged in" });
    }
    res.send(req.user);
});

// Cerrar sesión
sessionsRouter.get('/logout', async (req, res) => {
    console.log("Logging out user:", req.user);
    req.session.destroy(error => {
        if (error) {
            console.error("Session destruction error:", error);
            return res.status(500).send({ status: "error", error: "Couldn't close session" });
        }
        res.redirect('/login');
    });
});

sessionsRouter.post('/registerUser', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const newUser = await AuthService.registerUser({ firstName, lastName, email, password });
        res.status(201).send({ status: "success", message: "User registered successfully", payload: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send({ status: "error", error: error.message });
    }
});

sessionsRouter.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.loginUser(email, password);
        req.session.user = user; 
        res.send({ status: "success", message: "Logged in successfully", payload: user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(401).send({ status: "error", error: error.message });
    }
});

export default sessionsRouter;