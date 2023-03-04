import express from "express";
import sql, { ConnectionPool } from "mssql";
import dotenv from "dotenv";
import { DbConfig } from "./credenciales";

dotenv.config();

const app = express();

const config: DbConfig = {
	server: process.env.DB_SERVER ?? "",
	database: process.env.DB_NAME ?? "",
	user: process.env.DB_USER ?? "",
	password: process.env.DB_PASSWORD ?? "",
	port: Number(process.env.DB_PORT) ?? 0,
};

async function connect(config: DbConfig): Promise<ConnectionPool> {
	const pool = await sql.connect(config);
	return pool;
}
app.get("/", async (req, res) => {
	try {
		const pool = await connect(config);
		const result = await pool.request().query("SELECT * FROM usuario");
		res.json(result.recordset);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error retrieving data from database");
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
