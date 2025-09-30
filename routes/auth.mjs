import express from "express";
import { login } from "../controllers/authController.mjs";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado con token
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

export default router;
