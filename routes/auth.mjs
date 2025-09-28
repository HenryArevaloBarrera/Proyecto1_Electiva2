import express from "express";
import { register, login } from "../controllers/authController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Registro e inicio de sesión de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *               password:
 *                 type: string
 *                 example: miPassword123
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: email ya registrado
 *       500:
 *         description: Error en el servidor
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *               password:
 *                 type: string
 *                 example: miPassword123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, retorna el token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticación
 *       400:
 *         description: Usuario no registrado o credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */
router.post("/login", login);

export default router;