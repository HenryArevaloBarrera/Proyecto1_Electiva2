import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.mjs";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ state: false, error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ state: false, error: "Token inválido" });
    }

    // Verificar token y expiración
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar que el usuario aún exista
    const usuario = await Usuario.findOne({ correo: decoded.correo });
    if (!usuario) {
      return res.status(404).json({ state: false, error: "Usuario no encontrado" });
    }

    req.user = usuario;
    next();
  } catch (err) {
    return res.status(401).json({ state: false, error: "Token inválido o expirado" });
  }
};
