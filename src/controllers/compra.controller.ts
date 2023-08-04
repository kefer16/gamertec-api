import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { sequelize } from "../config/conexion";

import { Transaction } from "sequelize";

import { Modelo } from "../models/modelo.models";
import { CompraCabecera } from "../models/compra_cabecera.model";
import { CompraCabeceraModel } from "../interfaces/compra_cabecera.interface";
import { CompraDetalle } from "../models/compra_detalle.model";
import { CompraDetalleModel } from "../interfaces/compra_detalle.interface";

export class CompraController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CompraCabecera[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await CompraCabecera.findAll({
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
		let respuestaJson: RespuestaEntity<CompraCabecera | {}> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID: number = Number(req.query.compra_cabecera_id);

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: {},
					error: {
						code: 0,
						message: "no se envió la variable [compra_cabecera_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: CompraCabecera | null = await CompraCabecera.findOne({
				where: {
					compra_cabecera_id: ID,
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
		let respuestaJson: RespuestaEntity<CompraCabecera> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result: CompraCabecera | null = await CompraCabecera.findOne({
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
		let respuestaJson: RespuestaEntity<CompraDetalle[]> = new RespuestaEntity();
		let codigo1: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			(async () => {
				// await sequelize.authenticate();
				const transaction: Transaction = await sequelize.transaction();

				try {
					const compra_cabecera: CompraCabeceraModel = req.body;

					const result_cabecera: CompraCabecera = await CompraCabecera.create(
						compra_cabecera,
						{ transaction }
					);

					let compra_detalle: CompraDetalleModel[] = req.body.array_compra_detalle;

					compra_detalle = compra_detalle.map((item: CompraDetalleModel) => ({
						...item,
						fk_compra_cabecera: Number(result_cabecera.dataValues.compra_cabecera_id),
					}));

					const result_detalle: CompraDetalle[] = await CompraDetalle.bulkCreate(
						compra_detalle,
						{ transaction }
					);

					// await Carrito.update(
					// 	{ pedido: true },
					// 	{ where: { pedido: false, activo: true, despues: false } }
					// );

					respuestaJson = {
						code: codigo1,
						data: result_detalle,
						error: {
							code: 0,
							message: "",
						},
					};

					await transaction.commit();
				} catch (error: any) {
					console.log(error.message);

					codigo1 = 500;
					await transaction.rollback();
				}
			})();
			res.status(codigo1).json(respuestaJson);
		} catch (error: any) {
			ErrorController.grabarError(codigo1, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async actualizar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CompraCabecera> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const ID: number = Number(req.query.compra_cabecera_id);

			const {
				compra_cabecera_id,
				codigo,
				direccion,
				telefono,
				sub_total,
				costo_envio,
				total,
				fecha_registro,
				activo,
				fk_distrito,
				fk_pedido_cabecera,
				fk_usuario,
			} = req.body;

			await CompraCabecera.update(
				{
					compra_cabecera_id,
					codigo,
					direccion,
					telefono,
					sub_total,
					costo_envio,
					total,
					fecha_registro,
					activo,
					fk_distrito,
					fk_pedido_cabecera,
					fk_usuario,
				},
				{
					where: {
						compra_cabecera_id: ID,
					},
				}
			);

			const filaActualizada: CompraCabecera | null = await CompraCabecera.findOne({
				// Condiciones para obtener el registro actualizado
				where: { compra_cabecera_id: ID },
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
					data: {},
					error: {
						code: 0,
						message: "no se envió la variable [pedido_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await CompraCabecera.destroy({
				where: {
					compra_cabecera_id: ID,
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

	static async listarComprasUsuario(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CompraCabecera[]> = new RespuestaEntity();
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

			CompraCabecera.hasOne(CompraDetalle, { foreignKey: "fk_compra_cabecera" });
			CompraDetalle.belongsTo(CompraCabecera, {
				foreignKey: "fk_compra_cabecera",
			});

			CompraDetalle.hasOne(Modelo, {
				foreignKey: "modelo_id",
				sourceKey: "fk_modelo",
			});
			Modelo.belongsTo(CompraDetalle, {
				foreignKey: "modelo_id",
				targetKey: "fk_modelo",
			});

			const pedido = await CompraCabecera.findAll({
				attributes: [
					"compra_cabecera_id",
					"codigo",
					"sub_total",
					"costo_envio",
					"total",
					"fecha_registro",
					"activo",
				],
				include: [
					{
						model: CompraDetalle,
						attributes: [
							"compra_detalle_id",
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
