import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { Modelo } from "../models/modelo.models";
import { sequelize } from "../config/conexion";
import { modeloFiltroInterface } from "../interface/productos.interface";
import { QueryTypes } from "sequelize";

export class ModeloController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Modelo.findAll({
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

			const ID = req.query.modelo_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Modelo | null = await Modelo.findOne({
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
				nombre,
				descripcion,
				foto,
				caracteristicas,
				color,
				precio,
				fecha_registro,
				stock,
				numero_series,
				activo,
				fk_marca,
				fk_categoria,
			} = req.body;
			const result: Modelo = await Modelo.create({
				nombre,
				descripcion,
				foto,
				caracteristicas,
				color,
				precio,
				fecha_registro,
				stock,
				numero_series,
				activo,
				fk_marca,
				fk_categoria,
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
			const ID = req.query.modelo_id;
			const {
				nombre,
				descripcion,
				foto,
				caracteristicas,
				color,
				precio,
				fecha_registro,
				stock,
				numero_series,
				activo,
				fk_marca,
				fk_categoria,
			} = req.body;

			await Modelo.update(
				{
					nombre,
					descripcion,
					foto,
					caracteristicas,
					color,
					precio,
					fecha_registro,
					stock,
					numero_series,
					activo,
					fk_marca,
					fk_categoria,
				},
				{
					where: {
						modelo_id: ID,
					},
				}
			);

			const filaActualizada: Modelo | null = await Modelo.findOne({
				// Condiciones para obtener el registro actualizado
				where: { modelo_id: ID },
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

			const ID = req.query.modelo_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await Modelo.destroy({
				where: {
					modelo_id: ID,
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

	static async listarModelosPorFiltro(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const categoria_id = req.query.categoria_id;
			const nombre_modelo = req.query.nombre_modelo;

			if (categoria_id === undefined) {
				respuestaJson = {
					code: 404,
					data: [],
					error: {
						code: 0,
						message: "no se envió la variable [categoria_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}
			if (nombre_modelo === undefined) {
				respuestaJson = {
					code: 404,
					data: [],
					error: {
						code: 0,
						message: "no se envió la variable [nombre_modelo] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			let arrayProductos: modeloFiltroInterface[] = [];

			const resultado = await sequelize.query(
				"exec sp_modelos_por_filtro_listar @fk_categoria= ?, @nombre_modelo= ?",
				{
					replacements: [categoria_id, nombre_modelo],
					type: QueryTypes.SELECT,
				}
			);

			resultado.forEach((element: any) => {
				const item: modeloFiltroInterface = {
					modelo: {
						modelo_id: element.modelo_id as number,
						descripcion: element.modelo_descripcion as string,
						precio: element.modelo_precio as number,
						foto: element.modelo_foto as string,
					},
					marca: {
						marca_id: element.marca_id as number,
						nombre: element.marca_nombre as string,
					},
				};
				arrayProductos.push(item);
			});

			respuestaJson = {
				code: codigo,
				data: arrayProductos,
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
