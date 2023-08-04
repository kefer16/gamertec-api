import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { Comentario } from "../models/comentario.models";

export class ComentarioController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<Comentario[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			const result: Comentario[] = await Comentario.findAll({
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
		let respuestaJson: RespuestaEntity<Comentario | {}> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = req.query.comentario_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: {},
					error: {
						code: 0,
						message: "no se envió la variable [comentario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Comentario | null = await Comentario.findOne({
				where: {
					comentario_id: ID,
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
		let respuestaJson: RespuestaEntity<Comentario> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const {
				valoracion,
				usuario,
				titulo,
				mensaje,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;
			const result: Comentario = await Comentario.create({
				valoracion,
				usuario,
				titulo,
				mensaje,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
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
		let respuestaJson: RespuestaEntity<Comentario> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = req.query.comentario_id;
			const {
				valoracion,
				usuario,
				titulo,
				mensaje,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			await Comentario.update(
				{
					valoracion,
					usuario,
					titulo,
					mensaje,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
				{
					where: {
						comentario_id: ID,
					},
				}
			);

			const filaActualizada: Comentario | null = await Comentario.findOne({
				// Condiciones para obtener el registro actualizado
				where: { comentario_id: ID },
			});
			respuestaJson = {
				code: codigo,
				data: filaActualizada,
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
		let respuestaJson: RespuestaEntity<{}> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = req.query.comentario_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: {},
					error: {
						code: 0,
						message: "no se envió la variable [comentario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await Comentario.destroy({
				where: {
					comentario_id: ID,
				},
			});

			respuestaJson = {
				code: codigo,
				data: {},
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

	static async buscarPorModelo(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<Comentario[]> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = req.query.modelo_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [],
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result = await Comentario.findAll({
				where: {
					fk_modelo: ID,
				},
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
}
