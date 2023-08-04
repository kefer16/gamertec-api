import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { PedidoCabecera } from "../models/pedido_cabecera.model";
import { sequelize } from "../config/conexion";

import { Transaction } from "sequelize";
import { PedidoCabeceraModel } from "../interfaces/pedido_cabecera.interface";
import { PedidoDetalleSinIdModel } from "../interfaces/pedido_detalle.interface";
import { PedidoDetalle } from "../models/pedido_detalle.model";
import { Carrito } from "../models/carrito.models";
import { Modelo } from "../models/modelo.models";
// import { Modelo } from "../models/modelo.models";

export class PedidoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabecera[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await PedidoCabecera.findAll({
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
		let respuestaJson: RespuestaEntity<PedidoCabecera | {}> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID: number = Number(req.query.pedido_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: {},
					error: {
						code: 0,
						message: "no se envió la variable [pedido_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: PedidoCabecera | null = await PedidoCabecera.findOne({
				attributes: [
					"pedido_cabecera_id",
					"codigo",
					"direccion",
					"telefono",
					"sub_total",
					"costo_envio",
					"total",
					"fecha_registro",
					"activo",
				],

				include: [
					{
						model: PedidoDetalle,
						as: "array_pedido_detalle",
						attributes: [
							"pedido_detalle_id",
							"item",
							"cantidad",
							"precio",
							"total",
							"fecha_registro",
							"activo",
						],
						include: [
							{
								model: Modelo,
								as: "modelo",
								attributes: ["modelo_id", "nombre", "descripcion", "foto"],
							},
						],
					},
				],

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
			ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async listarUltimo(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabecera> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result: PedidoCabecera | null = await PedidoCabecera.findOne({
				order: [["pedido_cabecera_id", "DESC"]],
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
		let respuestaJson: RespuestaEntity<PedidoDetalle[]> = new RespuestaEntity();
		let codigo: number = 200;

		await ApiEnvioController.grabarEnvioAPI(code_send, req);
		const transaction: Transaction = await sequelize.transaction();
		try {
			// (async () => {
			// await sequelize.authenticate();

			const pedido_cabecera: PedidoCabeceraModel = req.body.pedido_cabecera;

			const result_cabecera: PedidoCabecera = await PedidoCabecera.create(
				pedido_cabecera,
				{ transaction }
			);

			let pedido_detalle: PedidoDetalleSinIdModel[] =
				req.body.array_pedido_detalle;

			pedido_detalle = pedido_detalle.map((item: PedidoDetalleSinIdModel) => ({
				...item,
				fk_pedido_cabecera: Number(result_cabecera.dataValues.pedido_cabecera_id),
			}));

			const result_detalle: PedidoDetalle[] = await PedidoDetalle.bulkCreate(
				pedido_detalle,
				{ transaction }
			);

			await Carrito.update(
				{ pedido: true },
				{ where: { pedido: false, activo: true, despues: false } }
			);

			respuestaJson = {
				code: codigo,
				data: result_detalle,
				error: {
					code: 0,
					message: "",
				},
			};

			await transaction.commit();

			// })();
			res.status(codigo).json(respuestaJson);
		} catch (error: any) {
			await transaction.rollback();
			codigo = 500;
			ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async actualizar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabecera> = new RespuestaEntity();
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

			await PedidoCabecera.update(
				{
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
				{
					where: {
						pedido_cabecera_id: ID,
					},
				}
			);

			const filaActualizada: PedidoCabecera | null = await PedidoCabecera.findOne({
				// Condiciones para obtener el registro actualizado
				where: { pedido_cabecera_id: ID },
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

			const ID: number = Number(req.query.pedido_id);

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [pedido_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await PedidoCabecera.destroy({
				where: {
					pedido_cabecera_id: ID,
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

	static async listarPedidosUsuario(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<PedidoCabecera[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const usuario_id: number = Number(req.query.usuario_id);

			if (Number.isNaN(usuario_id)) {
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

			const pedido = await PedidoCabecera.findAll({
				attributes: [
					"pedido_cabecera_id",
					"codigo",
					"sub_total",
					"costo_envio",
					"total",
					"fecha_registro",
					"activo",
				],

				include: [
					{
						model: PedidoDetalle,
						as: "array_pedido_detalle",
						attributes: [
							"pedido_detalle_id",
							"item",
							"cantidad",
							"precio",
							"total",
							"fecha_registro",
							"activo",
						],
						include: [
							{
								model: Modelo,
								as: "modelo",
								attributes: ["modelo_id", "nombre", "descripcion", "foto"],
							},
						],
					},
				],
				where: {
					fk_usuario: usuario_id,
					activo: true,
				},
			});

			respuestaJson = {
				code: codigo,
				data: pedido,
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
