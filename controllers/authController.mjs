import Usuario from "../models/usuario.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Inicio de sesión
async function login(req, res) {
    const { correo, contraseña } = req.body;

    try {
        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ state: false, error: "Usuario no encontrado" });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            return res.status(401).json({ state: false, error: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const payload = { id: usuario._id, correo: usuario.correo };
        const token = jwt.sign(
  { correo: usuario.correo }, // ⚠️ usamos correo
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

        res.status(200).json({ state: true, token, usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo } });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

export { login };
