import Producto from "../models/productos.mjs";

// Obtener todos los productos (sin filtrar por usuario)
async function findAll(req, res) {
  try {
    const productos = await Producto.find()
      .populate("usuarioId", "nombre correo telefono");

    res.status(200).json({
      state: true,
      productos,   // todos los productos
      total: productos.length,
    });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}


// Buscar producto por _id
async function findById(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id).populate(
      "usuarioId",  // ⚡ corregido
      "nombre correo telefono"
    );
    if (!producto) {
      return res
        .status(404)
        .json({ state: false, error: "No se encontró el producto" });
    }
    res.status(200).json({ state: true, producto });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Crear nuevo producto
async function save(req, res) {
  try {
    // ⚡ Asegurarse de usar usuarioId que es obligatorio en el modelo
    const nuevoProducto = new Producto({
      ...req.body,
      usuarioId: req.user._id, // ⚡ asignar usuario logueado correctamente
    });
    const result = await nuevoProducto.save();
    res.status(201).json({ state: true, producto: result });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
}

// Actualizar producto
async function update(req, res) {
  const { id } = req.params;
  try {
    const result = await Producto.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res
        .status(404)
        .json({ state: false, error: "No se encontró el producto" });
    }
    res.status(200).json({ state: true, producto: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

// Eliminar producto
async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const result = await Producto.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ state: false, error: "No se encontró el producto" });
    }
    res.status(200).json({ state: true, producto: result });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
}

export { findAll, findById, save, update, deleteById };
