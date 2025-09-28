import express from "express";
import { findAll, findById, save, update, deleteById } from "../controllers/controlles-compania.mjs";
import { authMiddleware } from "../middlewares/auth.mjs"; // protege rutas con JWT

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Compañías
 *   description: Gestión de compañías
 */

/**
 * @swagger
 * /api/comps:
 *   get:
 *     summary: Obtener todas las compañías
 *     tags: [Compañías]
 *     responses:
 *       200:
 *         description: Lista de compañías obtenida correctamente
 */
router.get("/", authMiddleware,findAll);

/**
 * @swagger
 * /api/comps/{id}:
 *   get:
 *     summary: Obtener una compañía por su ID
 *     tags: [Compañías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía encontrada
 *       404:
 *         description: No se encontró la compañía
 */
router.get("/:id", authMiddleware,findById);

/**
 * @swagger
 * /api/comps:
 *   post:
 *     summary: Crear una nueva compañía
 *     tags: [Compañías]
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
 *               pais:
 *                 type: string
 *               fundacion:
 *                 type: number
 *               empleados:
 *                 type: number
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente
 */
router.post("/", authMiddleware, save);

/**
 * @swagger
 * /api/comps/{id}:
 *   put:
 *     summary: Actualizar una compañía existente
 *     tags: [Compañías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               pais:
 *                 type: string
 *               fundacion:
 *                 type: number
 *               empleados:
 *                 type: number
 *     responses:
 *       200:
 *         description: Compañía actualizada
 *       404:
 *         description: No se encontró la compañía
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/comps/{id}:
 *   delete:
 *     summary: Eliminar una compañía por ID
 *     tags: [Compañías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía eliminada exitosamente
 *       404:
 *         description: No se encontró la compañía
 */
router.delete("/:id", authMiddleware, deleteById);

export default router;