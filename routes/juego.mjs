import express from "express";
import { findAll, findById, save, update, deleteById } from "../controllers/controlles-juego.mjs";
import { authMiddleware } from "../middlewares/auth.mjs"; // protege rutas con JWT

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Juegos
 *   description: Gestión de juegos
 */

/**
 * @swagger
 * /api/juegos:
 *   get:
 *     summary: Obtener todos los juegos
 *     tags: [Juegos]
 *     responses:
 *       200:
 *         description: Lista de juegos
 */
router.get("/",authMiddleware, findAll);

/**
 * @swagger
 * /api/juegos/{id}:
 *   get:
 *     summary: Obtener un juego por ID
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del juego
 *     responses:
 *       200:
 *         description: Juego encontrado
 *       404:
 *         description: No se encontró el juego
 */
router.get("/:id",authMiddleware,findById);

/**
 * @swagger
 * /api/juegos:
 *   post:
 *     summary: Crear un nuevo juego
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               genero:
 *                 type: string
 *               lanzamiento:
 *                 type: number
 *               compania:
 *                 type: string
 *     responses:
 *       201:
 *         description: Juego creado
 */
router.post("/", authMiddleware, save);

/**
 * @swagger
 * /api/juegos/{id}:
 *   put:
 *     summary: Actualizar un juego por ID
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del juego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               genero:
 *                 type: string
 *               lanzamiento:
 *                 type: number
 *               compania:
 *                 type: string
 *     responses:
 *       200:
 *         description: Juego actualizado
 *       404:
 *         description: No se encontró el juego
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/juegos/{id}:
 *   delete:
 *     summary: Eliminar un juego por ID
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del juego
 *     responses:
 *       200:
 *         description: Juego eliminado
 *       404:
 *         description: No se encontró el juego
 */
router.delete("/:id", authMiddleware, deleteById);

export default router;