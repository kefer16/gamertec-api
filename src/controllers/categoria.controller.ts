import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { prisma } from "../config/conexion";
import { CategoriaSend } from "../interfaces/categoria.interface";

export class CategoriaController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CategoriaSend[]> = new RespuestaEntity();
		let codigo: number = 200;
		await ApiEnvioController.grabarEnvioAPI(code_send, req);
		try {
			const result: CategoriaSend[] = await prisma.categoria.findMany({
				orderBy: {
					fecha_actualizacion: "desc",
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
		let respuestaJson: RespuestaEntity<CategoriaSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.categoria_id);

			if (Number.isNaN(ID)) {
				codigo = 404;
				respuestaJson = {
					code: codigo,
					data: null,
					error: {
						code: 404,
						message: "no se envió la variable [categoria_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: CategoriaSend | null = await prisma.categoria.findUnique({
				where: {
					categoria_id: ID,
				},
			});

			if (!result) {
				respuestaJson = {
					code: codigo,
					data: null,
					error: {
						code: 404,
						message: `No se encontró la categoria con el ID: ${ID}`,
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

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
		let respuestaJson: RespuestaEntity<CategoriaSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const { nombre, activo, fecha_registro, fecha_actualizacion } = req.body;

			const result: CategoriaSend = await prisma.categoria.create({
				data: {
					nombre,
					activo,
					fecha_registro,
					fecha_actualizacion,
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
		let respuestaJson: RespuestaEntity<CategoriaSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = Number(req.query.categoria_id);

			if (Number.isNaN(ID)) {
				codigo = 404;
				respuestaJson = {
					code: codigo,
					data: null,
					error: {
						code: 404,
						message: "no se envió la variable [categoria_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const { nombre, activo, fecha_registro, fecha_actualizacion } = req.body;

			const result: CategoriaSend = await prisma.categoria.update({
				data: {
					nombre,
					activo,
					fecha_registro,
					fecha_actualizacion,
				},
				where: {
					categoria_id: ID,
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
		let respuestaJson: RespuestaEntity<CategoriaSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.categoria_id);

			if (Number.isNaN(ID)) {
				codigo = 400;
				respuestaJson = {
					code: codigo,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [categoria_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result1: CategoriaSend | null = await prisma.categoria.findUnique({
				where: {
					categoria_id: ID,
				},
			});

			if (!result1) {
				codigo = 404;
				respuestaJson = {
					code: codigo,
					data: null,
					error: {
						code: 0,
						message: `no se encontró categoria con el ID: ${ID}`,
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result = await prisma.categoria.delete({
				where: {
					categoria_id: ID,
				},
			});

			respuestaJson = {
				code: codigo,
				data: result,
				error: {
					code: 0,
					message: "exitoso",
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
