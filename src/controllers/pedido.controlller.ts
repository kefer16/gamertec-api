import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { PedidoCabecera } from "../models/pedido_cabecera.model";
import { sequelize } from "../config/conexion";
import { PedidoCabeceraModel } from "../interfaces/pedido_cabecera.interface";
import { PedidoDetalleModel } from "../interfaces/pedido_detalle.interface";
import { PedidoDetalle } from "../models/pedido_detalle.model";
import { Transaction } from "sequelize";

export class PedidoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
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
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
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

			const result: PedidoCabecera | null = await PedidoCabecera.findOne({
				where: {
					pedido_cabecera_id: ID,
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
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;

		const transaction: Transaction = await sequelize.transaction();
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const pedido_cabecera: PedidoCabeceraModel = req.body.pedido_cabecera;
			const pedido_detalle: PedidoDetalleModel[] = req.body.pedido_detalle;

			const result_cabecera: PedidoCabecera = await PedidoCabecera.create(
				pedido_cabecera,
				{ transaction }
			);
			const result_detalle: PedidoDetalle[] = await PedidoDetalle.bulkCreate(
				pedido_detalle,
				{ transaction }
			);

			respuestaJson = {
				code: codigo,
				data: [result_cabecera, result_detalle],
				error: {
					code: 0,
					message: "",
				},
			};

			res.status(codigo).json(respuestaJson);
			await transaction.commit();
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
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
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
				data: [filaActualizada ?? {}],
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
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
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
				data: [],
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
