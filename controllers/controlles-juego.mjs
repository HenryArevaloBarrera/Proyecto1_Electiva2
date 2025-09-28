import Juego from "../models/juegos.mjs";
import Compañia from "../models/compania.mjs"

// Obtener todos los juegos
async function findAll(req, res) {
    try {
        const result = await Juego.find();
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Buscar juego por _id (ObjectId de Mongo)
async function findById(req, res) {
    const { id } = req.params;
    try {
        const result = await Juego.findById(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el juego" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Guardar nuevo juego
async function save(req, res) {
    try {
        const nuevoJuego = new Juego(req.body);
        const result = await nuevoJuego.save();
        res.status(201).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Actualizar juego por _id
async function update(req, res) {
    const { id } = req.params; 
    try {
        const result = await Juego.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el juego" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Eliminar juego por _id
async function deleteById(req, res) {
    const { id } = req.params;
    try {
        const result = await Juego.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró el juego" });
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
    deleteById
};
