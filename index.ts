import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("¡Hola, mundo!");
});

app.listen(port, () => {
	console.log(`Servidor iniciado en http://localhost:${port}`);
});
