import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import { swaggerUi, swaggerDocs } from "./swagger.mjs";
import routsComp from "./routes/compania.mjs";
import routsJuegos from "./routes/juego.mjs";
import routsAuth from "./routes/auth.mjs";
import serverless from "serverless-http";
import "./drivers/conection-db.mjs";



const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', './views'); 

// Ruta principal que renderiza index.ejs
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// Rutas principales
app.use("/api/auth", routsAuth);
app.use("/api/comps", routsComp);
app.use("/api/juegos", routsJuegos);

// Documentación con Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});