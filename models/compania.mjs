import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CompaniaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
    fundacion: {
      type: Number, 
      required: true,
    },
    empleados: {
      type: Number,
      default: 0, 
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Compania || mongoose.model("Compania", CompaniaSchema);