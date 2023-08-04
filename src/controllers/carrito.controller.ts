import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { Carrito } from "../models/carrito.models";
import { CarritoInterface } from "../interfaces/carrito.interface";
import { sequelize } from "../config/conexion";
import { QueryTypes } from "sequelize";

export class CarritoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<Carrito[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			const result = await Carrito.findAll({
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
		let respuestaJson: RespuestaEntity<Carrito> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.carrito_id);

			if (ID === undefined) {
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

			const result: Carrito | null = await Carrito.findOne({
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
		let respuestaJson: RespuestaEntity<Carrito> = new RespuestaEntity();
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
			const result: Carrito = await Carrito.create({
				cantidad,
				precio_total,
				despues,
				pedido,
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
		let respuestaJson: RespuestaEntity<Carrito> = new RespuestaEntity();
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

			await Carrito.update(
				{
					cantidad,
					precio_total,
					despues,
					pedido,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
				{
					where: {
						carrito_id: ID,
					},
				}
			);

			const filaActualizada: Carrito | null = await Carrito.findOne({
				// Condiciones para obtener el registro actualizado
				where: { carrito_id: ID },
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

			const ID = Number(req.query.carrito_id);

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: {},
					error: {
						code: 0,
						message: "no se envió la variable [carrito_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await Carrito.destroy({
				where: {
					carrito_id: ID,
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

	static async obtenerCarritoPorUsuario(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<CarritoInterface[]> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = req.query.usuario_id;

			if (ID === undefined) {
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

			let arrayCarrito: CarritoInterface[] = [];

			const resultado = await sequelize.query(
				"exec obtener_carrito_por_usuario @usuario_id= ?",
				{
					replacements: [ID],
					type: QueryTypes.SELECT,
				}
			);

			resultado.forEach((element: any) => {
				const item: CarritoInterface = {
					marca: {
						marca_id: element.marca_id as number,
						nombre: element.marca_nombre as string,
					},
					modelo: {
						modelo_id: element.modelo_id as number,
						nombre: element.modelo_nombre as string,
						descripcion: element.modelo_descripcion as string,
						caracteristicas: element.modelo_caracteristicas as string,
						precio: element.modelo_precio as number,
						foto: element.modelo_foto as string,
						color: element.modelo_color as string,
						stock: element.modelo_stock as number,
					},
					carrito: {
						carrito_id: element.carrito_id as number,
						cantidad: element.carrito_cantidad as number,
						fecha_registro: element.carrito_fecha_registro as string,
						activo: element.carrito_activo as boolean,
					},
				};
				arrayCarrito.push(item);
			});

			respuestaJson = {
				code: codigo,
				data: arrayCarrito,
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
