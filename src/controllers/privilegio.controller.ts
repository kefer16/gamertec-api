import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { Privilegio } from "../models/privilegio.models";

export class PrivilegioController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<Privilegio[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Privilegio.findAll({
				order: [["fecha_registro", "DESC"]],
			});
			respuestaJson = {
				code: codigo,
				data: result,
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
		let respuestaJson: RespuestaEntity<Privilegio> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const idPrivilegio = req.query.privilegio_id;

			if (idPrivilegio === undefined) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [privilegio_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Privilegio | null = await Privilegio.findOne({
				where: {
					privilegio_id: idPrivilegio,
				},
			});

			respuestaJson = {
				code: codigo,
				data: result,
				error: {
					code: 0,
					message: "",
				},
			};

			console.log(respuestaJson);

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
		let respuestaJson: RespuestaEntity<Privilegio> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const { tipo, activo, abreviatura, fecha_registro } = req.body;
			const result: Privilegio = await Privilegio.create({
				tipo,
				activo,
				abreviatura,
				fecha_registro,
			});

			respuestaJson = {
				code: codigo,
				data: result,
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
		let respuestaJson: RespuestaEntity<Privilegio> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const idPrivilegio = req.query.privilegio_id;
			const { tipo, activo, abreviatura, fecha_registro } = req.body;

			await Privilegio.update(
				{
					tipo,
					activo,
					abreviatura,
					fecha_registro,
				},
				{
					where: {
						privilegio_id: idPrivilegio,
					},
				}
			);

			const filaActaulizada: Privilegio | null = await Privilegio.findOne({
				// Condiciones para obtener el registro actualizado
				where: { privilegio_id: idPrivilegio },
			});
			respuestaJson = {
				code: codigo,
				data: filaActaulizada,
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
	static async eliminarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<null> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = req.query.privilegio_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [privilegio_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await Privilegio.destroy({
				where: {
					privilegio_id: ID,
				},
			});

			respuestaJson = {
				code: codigo,
				data: null,
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
