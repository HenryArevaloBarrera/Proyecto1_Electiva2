import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import cors from "cors";
import express from "express";
import { swaggerUi, swaggerDocs } from "./swagger.mjs";
import routsAuth from "./routes/auth.mjs";
import routsUsuarios from "./routes/usuario.mjs";
import routsProductos from "./routes/producto.mjs";
import serverless from "serverless-http";
import { getDbStatus } from "./drivers/conection-db.mjs";

import mongoose from "mongoose";

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

// Rutas de renderizado
app.get("/", (req, res) => {
  res.render("index", { title: "Inicio", dbStatus: getDbStatus() });
});

app.get("/productos", (req, res) => {
  res.render("productos", { title: "Productos" });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Registro" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Iniciar Sesión" });
});
// Página de perfil protegida
app.get("/perfil", (req, res) => {
  res.render("perfil", { title: "Mi Perfil" });
});
app.get("/producto/:id", (req, res) => {
  res.render("producto", { id: req.params.id });
});
// Rutas API
app.use("/api/auth", routsAuth);       
app.use("/api/usuarios", routsUsuarios);
app.use("/api/productos", routsProductos);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});

export const handler = serverless(app);
