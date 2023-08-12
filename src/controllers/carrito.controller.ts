import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import {
	CarritoSend,
	CarritoUsuarioSend,
} from "../interfaces/carrito.interface";
import { prisma } from "../config/conexion";

export class CarritoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoSend[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result = await prisma.carrito.findMany({
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
			await ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async listarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.carrito_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [carrito_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: CarritoSend | null = await prisma.carrito.findUnique({
				where: {
					carrito_id: ID,
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
	static async registrar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const {
				cantidad,
				precio_total,
				despues,
				pedido,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			const result: CarritoSend = await prisma.carrito.create({
				data: {
					cantidad,
					precio_total,
					despues,
					pedido,
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
			await ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async actualizar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = Number(req.query.carrito_id);
			const {
				cantidad,
				precio_total,
				despues,
				pedido,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			const result: CarritoSend = await prisma.carrito.update({
				data: {
					cantidad,
					precio_total,
					despues,
					pedido,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
				where: {
					carrito_id: ID,
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
	static async eliminarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.carrito_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [carrito_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result = await prisma.carrito.delete({
				where: {
					carrito_id: ID,
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

	static async obtenerCarritoPorUsuario(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoUsuarioSend[]> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.usuario_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: [],
					error: {
						code: 0,
						message: "no se envió la variable [usuario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: CarritoUsuarioSend[] = await prisma.carrito.findMany({
				select: {
					carrito_id: true,
					cantidad: true,
					fecha_registro: true,
					activo: true,
					cls_modelo: {
						select: {
							modelo_id: true,
							nombre: true,
							descripcion: true,
							caracteristicas: true,
							precio: true,
							foto: true,
							color: true,
							stock: true,
							cls_marca: {
								select: {
									marca_id: true,
									nombre: true,
								},
							},
						},
					},
				},
				where: {
					fk_usuario: ID,
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
