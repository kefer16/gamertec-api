import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import { sequelize } from "./src/config/conexion";
import { usuarioRoutes } from "./src/routes/usuario.routes";
import { autenticacionRoutes } from "./src/routes/autentication.routes";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/usuario", usuarioRoutes);
app.use("/token", autenticacionRoutes);

// Authentication middleware for routes that need authentication
// app.use("/authenticated", autenticacion);

// Example route that requires authentication
app.get("/authenticated/example", (req, res) => {
	return res.json({ message: "Authenticated" });
});

// Start server and connect to database
const port = process.env.PORT || 3000;

sequelize
	.authenticate()
	.then(() => {
		console.log("Connected to database");
		app.listen(port, () => console.log(`Server running on port ${port}`));
	})
	.catch((error) => console.log(error));
