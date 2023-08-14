import { Request, Response } from "express";
import { ErrorController } from "../controllers/error.controlller";
import { RespuestaTokenEntity } from "../entities/respuestacredenciales.entity";
import { ApiEnvioController } from "../controllers/apienvio.controller";
import { v4 as uuidv4 } from "uuid";

export class AutenticacionControlller {
	static async generarToken(req: Request, res: Response) {
		const code_send = uuidv4();
		let RepuestaJson: RespuestaTokenEntity = new RespuestaTokenEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			res.status(200).json(RepuestaJson);
		} catch (error: any) {
			codigo = 500;
			ErrorController.grabarErrorToken(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, res);
		}
	}
}
