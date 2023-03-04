import express from "express";
import { sequelize } from "./sequelize";
import { Usuario } from "./src/models/usuario..models";

const app = express();

app.get("/", async (req, res) => {
	try {
		await sequelize.authenticate();
		const result = await Usuario.findAll();
		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error retrieving data from database");
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
