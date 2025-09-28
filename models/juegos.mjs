import mongoose from "mongoose";

const { Schema, model } = mongoose;

const JuegoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    lanzamiento: {
      type: Number, 
    },
    compania: {
      type: Schema.Types.ObjectId,
      ref: "Compania", 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Juego || mongoose.model("Juego", JuegoSchema);
