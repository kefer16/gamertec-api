import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as fs from "fs";
import swaggerUi from "swagger-ui-express";
import { sequelize } from "./src/config/conexion";
import { usuarioRoutes } from "./src/routes/usuario.routes";
import { autenticacionRoutes } from "./src/routes/autentication.routes";
import { privilegioRoutes } from "./src/routes/privilegio.router";

dotenv.config();

// Cargar la especificación Swagger desde un archivo JSON
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

// Definir la URL base a partir de la variable de entorno
const baseUrl = process.env.API_HOST || "http://localhost:3000";
// Start server and connect to database
const port = process.env.PORT || 3000;
// Agregar la URL base a la especificación Swagger
swaggerDocument.servers = [{ url: baseUrl }];

// Crear una instancia de express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar swagger-ui-express con la especificación y la URL base
app.use("/api-docs", swaggerUi.serve);
app.get(
	"/api-docs",
	swaggerUi.setup(swaggerDocument, {
		swaggerOptions: { url: `${baseUrl}/swagger.json` },
	})
);

// // Configuración de Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/privilegio", privilegioRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/token", autenticacionRoutes);

// Authentication middleware for routes that need authentication
// app.use("/authenticated", autenticacion);

// Example route that requires authentication
app.get("/authenticated/example", (req, res) => {
	return res.json({ message: "Authenticated" });
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connected to database");
		app.listen(port, () =>
			console.log(`Server running on port ${port} + ${process.env.API_HOST}`)
		);
	})
	.catch((error) => console.log(error));
