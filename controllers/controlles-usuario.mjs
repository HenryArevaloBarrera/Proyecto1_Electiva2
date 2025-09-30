import Usuario from "../models/usuario.mjs";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
async function findAll(req, res) {
  try {
    const result = await Usuario.find().select("-contraseña"); // No mostrar contraseña
    res.status(200).json({ state: true, data: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Buscar usuario por _id o correo
async function findById(req, res) {
  const { id, correo } = req.params;

  try {
    let result;
    if (correo) {
      result = await Usuario.findOne({ correo }).select("-contraseña");
    } else if (id) {
      result = await Usuario.findById(id).select("-contraseña");
    }

    if (!result) {
      return res.status(404).json({ state: false, error: "Usuario no encontrado" });
    }
    res.status(200).json({ state: true, data: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Obtener perfil del usuario logueado (desde authMiddleware)
async function getProfile(req, res) {
  try {
    const usuario = await Usuario.findById(req.user._id).select("-contraseña");
    if (!usuario) {
      return res.status(404).json({ state: false, error: "Usuario no encontrado" });
    }
    res.status(200).json({ state: true, usuario });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Crear nuevo usuario
async function save(req, res) {


  try {
    const { nombre, correo, contraseña, telefono, direccion } = req.body;
console.log(req.body);
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ state: false, error: "Nombre, correo y contraseña son obligatorios" });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ state: false, error: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: hash,
      telefono,
      direccion
    });

    const result = await nuevoUsuario.save();
    res.status(201).json({ state: true, data: result });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ state: false, error: error.message });
  }
}

// Actualizar usuario
async function update(req, res) {
  const { id } = req.params;
  try {
    const updateData = { ...req.body };
    if (updateData.contraseña) {
      updateData.contraseña = await bcrypt.hash(updateData.contraseña, 10);
    }

    const result = await Usuario.findByIdAndUpdate(id, updateData, { new: true }).select("-contraseña");
    if (!result) {
      return res.status(404).json({ state: false, error: "Usuario no encontrado" });
    }

    res.status(200).json({ state: true, data: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Actualizar perfil del usuario logueado
async function updateProfile(req, res) {
  try {
    const updateData = { ...req.body };
    if (updateData.contraseña) {
      updateData.contraseña = await bcrypt.hash(updateData.contraseña, 10);
    }

    const result = await Usuario.findByIdAndUpdate(req.user._id, updateData, { new: true }).select("-contraseña");
    if (!result) {
      return res.status(404).json({ state: false, error: "Usuario no encontrado" });
    }

    res.status(200).json({ state: true, usuario: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Eliminar usuario
async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const result = await Usuario.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ state: false, error: "Usuario no encontrado" });
    }
    res.status(200).json({ state: true, data: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

export {
  findAll,
  findById,
  save,
  update,
  deleteById,
  getProfile,
  updateProfile
};
