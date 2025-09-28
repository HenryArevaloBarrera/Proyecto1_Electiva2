import Compania from "../models/compania.mjs";

// Obtener todas las compañías
async function findAll(req, res) {
    try {
        const result = await Compania.find();
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Buscar compañía por _id (ObjectId)
async function findById(req, res) {
    const { id } = req.params;
    try {
        const result = await Compania.findById(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró la compañía" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Guardar nueva compañía
async function save(req, res) {
    try {
        const nuevaCompania = new Compania(req.body);
        const result = await nuevaCompania.save();
        res.status(201).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Actualizar compañía por _id
async function update(req, res) {
    const { id } = req.params; 
    try {
        const result = await Compania.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró la compañía" });
        }
        res.status(200).json({ state: true, data: result });
    } catch (error) {
        res.status(500).json({ state: false, error: error.message });
    }
}

// Eliminar compañía por _id
async function deleteById(req, res) {
    const { id } = req.params;
    try {
        const result = await Compania.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ state: false, error: "No se encontró la compañía" });
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
