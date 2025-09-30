import express from "express";
import Usuario from "../models/usuario.mjs";
import { findAll, findById, save, update, deleteById } from "../controllers/controlles-usuario.mjs";
import { authMiddleware } from "../middlewares/auth.mjs";
import Producto from "../models/productos.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", authMiddleware, findAll);

/**
 * @swagger
 * /api/usuarios/me:
 *   get:
 *     summary: Obtener los datos del usuario logueado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario logueado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const usuario = req.user;

    // ⚡ Buscar productos de este usuario
    const productos = await Producto.find({ usuario: usuario._id });

    res.status(200).json({ state: true, usuario, productos });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
});


/**
 * @swagger
 * /api/usuarios/me:
 *   put:
 *     summary: Actualizar datos del usuario logueado
 *     tags: [Usuarios]
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
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 */
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const id = req.user._id;
    const updates = req.body;
    const result = await Usuario.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ state: true, usuario: result });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: No se encontró el usuario
 */
router.get("/:id", authMiddleware, findById);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/", save);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: No se encontró el usuario
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: No se encontró el usuario
 */
router.delete("/:id", authMiddleware, deleteById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombre:
 *           type: string
 *         correo:
 *           type: string
 *         contraseña:
 *           type: string
 *         telefono:
 *           type: string
 *         direccion:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

export default router;
