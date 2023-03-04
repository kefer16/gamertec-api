import { Request, Response } from "express";
import { Usuario } from "../models/usuario.models";

export class UsuarioController {
	static async listar_usuarios(req: Request, res: Response) {
		try {
			// await sequelize.authenticate();
			const result = await Usuario.findAll();
			res.json(result);
		} catch (error: any) {
			console.error(error);
			res.status(500).send("Error retrieving data from database");
		}
	}

	static async register(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await Usuario.create({ username, password });

		return res.status(201).json(user);
	}

	static async login(req: Request, res: Response) {
		const { username, password } = req.body;

		const user = await Usuario.findOne({ where: { username, password } });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Generate and save token for user
		const token = "generated-token";
		//  user.token = token;
		//  await user.save();

		return res.json({ token });
	}
}
