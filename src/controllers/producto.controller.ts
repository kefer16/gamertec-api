import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { Producto } from "../models/producto.models";

export class ProductoController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Producto.findAll({
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

			const ID = req.query.producto_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [producto_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Producto | null = await Producto.findOne({
				where: {
					marca_id: ID,
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
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const {
				numero_serie,
				fk_modelo,
				fk_marca,
				fk_categoria,
				fecha_registro,
				activo,
			} = req.body;
			const result: Producto = await Producto.create({
				numero_serie,
				fk_modelo,
				fk_marca,
				fk_categoria,
				fecha_registro,
				activo,
			});

			respuestaJson = {
				code: codigo,
				data: [result],
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
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = req.query.producto_id;
			const {
				numero_serie,
				fk_modelo,
				fk_marca,
				fk_categoria,
				fecha_registro,
				activo,
			} = req.body;

			await Producto.update(
				{
					numero_serie,
					fk_modelo,
					fk_marca,
					fk_categoria,
					fecha_registro,
					activo,
				},
				{
					where: {
						producto_id: ID,
					},
				}
			);

			const filaActualizada: Producto | null = await Producto.findOne({
				// Condiciones para obtener el registro actualizado
				where: { producto_id: ID },
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

			const ID = req.query.producto_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [producto_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await Producto.destroy({
				where: {
					producto_id: ID,
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
