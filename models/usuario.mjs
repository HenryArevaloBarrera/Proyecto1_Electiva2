import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true
    },
    contraseña: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Usuario || model("Usuario", UsuarioSchema);
