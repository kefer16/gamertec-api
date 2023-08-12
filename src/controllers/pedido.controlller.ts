import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { prisma } from "../config/conexion";
import {
	PedidoCabeceraListarUnoSend,
	PedidoCabeceraSend,
	PedidoCabeceraUsuarioSend,
} from "../interfaces/pedido_cabecera.interface";
import {
	PedidoDetalleSend,
	PedidoDetalleSinIdModel,
} from "../interfaces/pedido_detalle.interface";

export class PedidoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabeceraSend[]> =
			new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result = await prisma.pedido_cabecera.findMany({
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
		let respuestaJson: RespuestaEntity<PedidoCabeceraListarUnoSend> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID: number = Number(req.query.pedido_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [pedido_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: PedidoCabeceraListarUnoSend | null =
				await prisma.pedido_cabecera.findUnique({
					select: {
						pedido_cabecera_id: true,
						codigo: true,
						direccion: true,
						telefono: true,
						sub_total: true,
						costo_envio: true,
						total: true,
						fecha_registro: true,
						activo: true,
						lst_pedido_detalle: {
							select: {
								pedido_detalle_id: true,
								item: true,
								cantidad: true,
								precio: true,
								total: true,
								fecha_registro: true,
								activo: true,
								cls_modelo: {
									select: {
										modelo_id: true,
										nombre: true,
										descripcion: true,
										foto: true,
									},
								},
							},
						},
					},
					where: {
						pedido_cabecera_id: ID,
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
			await ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async listarUltimo(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabeceraSend> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result: PedidoCabeceraSend | null =
				await prisma.pedido_cabecera.findFirst({
					orderBy: {
						pedido_cabecera_id: "desc",
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
		let respuestaJson: RespuestaEntity<boolean> = new RespuestaEntity();
		let codigo: number = 200;

		await ApiEnvioController.grabarEnvioAPI(code_send, req);

		try {
			await prisma.$transaction(async (prisma) => {
				const pedido_cabecera: PedidoCabeceraSend = req.body.pedido_cabecera;

				const result_cabecera = await prisma.pedido_cabecera.create({
					data: pedido_cabecera,
				});

				let pedido_detalle: PedidoDetalleSend[] = req.body.array_pedido_detalle;

				pedido_detalle = pedido_detalle.map((item: PedidoDetalleSinIdModel) => ({
					...item,
					fk_pedido_cabecera: Number(result_cabecera.pedido_cabecera_id),
				}));

				const result_detalle = await prisma.pedido_detalle.createMany({
					data: pedido_detalle,
				});

				const resultCarrito = await prisma.carrito.updateMany({
					where: {
						pedido: {
							equals: false,
						},
						activo: {
							equals: true,
						},
						despues: {
							equals: false,
						},
					},
					data: {
						pedido: true,
					},
				});

				return { result_cabecera, result_detalle, resultCarrito };
			});

			respuestaJson = {
				code: codigo,
				data: true,
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
		let respuestaJson: RespuestaEntity<PedidoCabeceraSend> =
			new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const ID: number = Number(req.query.pedido_id);

			const {
				pedido_cabecera_id,
				codigo,
				direccion,
				telefono,
				sub_total,
				costo_envio,
				total,
				fecha_registro,
				activo,
				fk_distrito,
				fk_usuario,
			} = req.body;

			const result = await prisma.pedido_cabecera.update({
				data: {
					pedido_cabecera_id,
					codigo,
					direccion,
					telefono,
					sub_total,
					costo_envio,
					total,
					fecha_registro,
					activo,
					fk_distrito,
					fk_usuario,
				},
				where: {
					pedido_cabecera_id: ID,
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
		let respuestaJson: RespuestaEntity<boolean | null> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID: number = Number(req.query.pedido_id);

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [pedido_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await prisma.$transaction(async (prisma) => {
				const resultPedidoDetalle = await prisma.pedido_cabecera.delete({
					where: {
						pedido_cabecera_id: ID,
					},
				});

				const resultPedidoCabecera = await prisma.pedido_cabecera.delete({
					where: {
						pedido_cabecera_id: ID,
					},
				});

				return { resultPedidoDetalle, resultPedidoCabecera };
			});

			respuestaJson = {
				code: codigo,
				data: true,
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

	static async listarPedidosUsuario(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabeceraUsuarioSend[]> =
			new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const usuario_id: number = Number(req.query.usuario_id);

			if (Number.isNaN(usuario_id)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [usuario_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: PedidoCabeceraUsuarioSend[] =
				await prisma.pedido_cabecera.findMany({
					select: {
						pedido_cabecera_id: true,
						codigo: true,
						sub_total: true,
						costo_envio: true,
						total: true,
						fecha_registro: true,
						activo: true,
						lst_pedido_detalle: {
							select: {
								pedido_detalle_id: true,
								item: true,
								cantidad: true,
								precio: true,
								total: true,
								fecha_registro: true,
								activo: true,
								cls_modelo: {
									select: {
										modelo_id: true,
										nombre: true,
										descripcion: true,
										foto: true,
									},
								},
							},
						},
					},
					where: {
						fk_usuario: usuario_id,
						activo: true,
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
