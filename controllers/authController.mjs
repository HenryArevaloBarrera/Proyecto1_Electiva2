import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Usuario from "../models/usuario.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Clave secreta para el JWT (guárdala en .env)
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";
console.log("JWT_SECRET:", process.env.JWT_SECRET);

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "Email ya registrado" });
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = new Usuario({ nombre, email, password: passwordHash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Usuario no registrado" });
    }

    // Verificar contraseña
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email }, // Payload
      JWT_SECRET,
      { expiresIn: "2h" } // Expira en 2 horas
    );

    res.status(200).json({ token }); // Aquí devuelves el token
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};