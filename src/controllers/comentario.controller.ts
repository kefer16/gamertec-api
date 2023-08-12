import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { prisma } from "../config/conexion";
import { ComentarioSend } from "../interfaces/Comentario.interface";

export class ComentarioController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<ComentarioSend[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result: ComentarioSend[] = await prisma.comentario.findMany({
				orderBy: {
					fecha_registro: "desc",
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
		let respuestaJson: RespuestaEntity<ComentarioSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.comentario_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [comentario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: ComentarioSend | null = await prisma.comentario.findUnique({
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
		let respuestaJson: RespuestaEntity<ComentarioSend> = new RespuestaEntity();
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

			const result: ComentarioSend = await prisma.comentario.create({
				data: {
					valoracion,
					usuario,
					titulo,
					mensaje,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
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
		let respuestaJson: RespuestaEntity<ComentarioSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = Number(req.query.comentario_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [comentario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}
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

			const result = await prisma.comentario.update({
				data: {
					valoracion,
					usuario,
					titulo,
					mensaje,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
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

			const ID = Number(req.query.comentario_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [comentario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result = await prisma.comentario.delete({
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
		let respuestaJson: RespuestaEntity<ComentarioSend[]> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.modelo_id);

			if (Number.isNaN(ID)) {
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

			const result = await prisma.comentario.findMany({
				where: {
					fk_modelo: ID,
				},
				orderBy: {
					fecha_registro: "desc",
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

			res.status(codigo).json(respuestaJson);
		} catch (error: any) {
			codigo = 500;
			ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}
}
