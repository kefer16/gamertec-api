import { Request, Response } from "express";
import { Usuario } from "../models/usuario.models";
import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entity/respuesta.entity";

export class UsuarioController {
	static async listar_todos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Usuario.findAll();
			respuestaJson = {
				code: codigo,
				data: [result],
				error: {
					code: 0,
					message: "",
				},
			};
			res.status(codigo).json(respuestaJson);
		} catch (error: any) {
			codigo = 500;
			ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
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
