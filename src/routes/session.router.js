import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import { Validator } from "../middlewares/credentialsValidator.js";

const router = Router();

// Ruta para registrar un nuevo usuario
// Se utiliza POST para crear un nuevo registro de usuario
router.post('/register', async (req, res) => {
    try {
        await sessionsController.register(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Registration failed", error: error.message });
    }
});

// Ruta para iniciar sesión
// Se utiliza POST para autenticar al usuario
router.post('/login', async (req, res) => {
    try {
        await sessionsController.login(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Login failed", error: error.message });
    }
});

// Ruta para cerrar sesión
// Se utiliza POST para cerrar la sesión del usuario
router.post('/logout', async (req, res) => {
    try {
        await sessionsController.logout(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Logout failed", error: error.message });
    }
});

// Ruta para obtener información del usuario actual
// Se utiliza GET, pero puede ser necesaria una validación previa mediante middleware
router.get('/current', Validator(['user', 'admin'], 'Get Current User'), async (req, res) => {
    try {
        await sessionsController.current(req, res);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Failed to retrieve current user", error: error.message });
    }
});

export default router;
