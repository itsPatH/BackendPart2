import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import { Validator } from "../middlewares/credentialsValidation.js";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        await sessionsController.register(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Registration failed", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        await sessionsController.login(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Login failed", error: error.message });
    }
});

router.post('/logout', async (req, res) => {
    try {
        await sessionsController.logout(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Logout failed", error: error.message });
    }
});

router.get('/current', Validator(['user', 'admin'], 'Get Current User'), async (req, res) => {
    try {
        await sessionsController.current(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Failed to retrieve current user", error: error.message });
    }
});

export default router;
