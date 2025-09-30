import mongoose from "mongoose";

let dbStatus = "❌ Desconectado";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    dbStatus = "✅ Conectado a Mongo Atlas";
    console.log(dbStatus);
  } catch (error) {
    dbStatus = "❌ Error al conectar: " + error.message;
    console.error(dbStatus);
  }
}

// Ejecutar conexión
connectDB();

// 👇 Exportamos función, no solo el valor
export function getDbStatus() {
  return dbStatus;
}
