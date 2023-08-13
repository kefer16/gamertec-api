import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { prisma } from "../config/conexion";
import { DistritoSend } from "../interfaces/distrito.interface";

export class DistritoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<DistritoSend[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await prisma.distrito.findMany({
				where: { activo: true },
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
		let respuestaJson: RespuestaEntity<DistritoSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.distrito_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [distrito_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: DistritoSend | null = await prisma.distrito.findUnique({
				where: {
					distrito_id: ID,
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
		let respuestaJson: RespuestaEntity<DistritoSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const { distrito_id, nombre, activo, fk_provincia, fk_departamento } =
				req.body;

			const result: DistritoSend = await prisma.distrito.create({
				data: {
					distrito_id,
					nombre,
					activo,
					fk_provincia,
					fk_departamento,
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
		let respuestaJson: RespuestaEntity<DistritoSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = Number(req.query.distrito_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [distrito_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const { nombre, activo, fk_provincia, fk_departamento } = req.body;

			const result: DistritoSend = await prisma.distrito.update({
				data: {
					nombre,
					activo,
					fk_provincia,
					fk_departamento,
				},
				where: {
					distrito_id: ID,
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
		let respuestaJson: RespuestaEntity<DistritoSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.distrito_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [distrito_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result = await prisma.distrito.delete({
				where: {
					distrito_id: ID,
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
			await ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}
}
