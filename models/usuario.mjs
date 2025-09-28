import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.Usuario || model("Usuario", UsuarioSchema);
