import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { obtenerFechaLocal } from "../utils/funciones.utils";
import { Privilegio } from "../models/privilegio.models";

export class PrivilegioController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Privilegio.findAll();
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

	static async listarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const idPrivilegio = req.query.id;

			if (idPrivilegio === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Privilegio | null = await Privilegio.findOne({
				where: {
					id: idPrivilegio,
				},
			});

			respuestaJson = {
				code: codigo,
				data: [result ?? {}],
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
	static async registrar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const { tipo, activo, abreviatura } = req.body;

			const result: Privilegio = await Privilegio.create({
				tipo,
				activo,
				abreviatura,
			});

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

	static async actualizar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const idPrivilegio = req.query.id;
			const { tipo, activo, abreviatura } = req.body;

			await Privilegio.update(
				{
					tipo,
					activo,
					abreviatura,
				},
				{
					where: {
						id: idPrivilegio,
					},
				}
			);

			const filaActaulizada: Privilegio | null = await Privilegio.findOne({
				// Condiciones para obtener el registro actualizado
				where: { id: idPrivilegio },
			});
			respuestaJson = {
				code: codigo,
				data: [filaActaulizada ?? {}],
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
}
