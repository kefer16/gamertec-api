import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { CredencialesInterface } from "../interface/credenciales.interface";
import { ErrorController } from "../controllers/error.controlller";
import { RespuestaTokenEntity } from "../entity/respuestacredenciales.entity";
import { ApiEnvioController } from "../controllers/apienvio.controller";
import { v4 as uuidv4 } from "uuid";
import { tokenInterface } from "../interface/token.interface";

export class AutenticacionControlller {
	static async generarToken(req: Request, res: Response) {
		const code_send = uuidv4();
		let RepuestaJson: RespuestaTokenEntity = new RespuestaTokenEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			const datos: any = req.body;

			const credenciales: CredencialesInterface = {
				usuario: datos.usuario ?? "",
				contrasenia: datos.contrasenia ?? "",
			};

			let resultado: tokenInterface[];
			resultado = await sequelize.query(
				"exec sp_generar_token @usuario= ?, @contrasenia= ?",
				{
					replacements: [credenciales.usuario, credenciales.contrasenia],
					type: QueryTypes.SELECT,
				}
			);

			RepuestaJson = {
				code: resultado[0].codigo,
				data: resultado[0].token,
			};

			res.status(resultado[0].codigo).json(RepuestaJson);
		} catch (error: any) {
			codigo = 500;
			ErrorController.grabarErrorToken(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, RepuestaJson, res);
		}
	}
	static async validarToken() {}
}
