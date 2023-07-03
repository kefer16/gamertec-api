import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { Op } from "sequelize";
import { Provincia } from "../models/provincia.models";

export class ProvinciaController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Provincia.findAll({
				where: { activo: { [Op.eq]: 1 } },
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

			const ID = req.query.provincia_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [provincia_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Provincia | null = await Provincia.findOne({
				where: {
					provincia_id: ID,
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
			const { nombre, activo, fk_departamento } = req.body;
			const result: Provincia = await Provincia.create({
				nombre,
				activo,
				fk_departamento,
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
			const ID = req.query.provincia_id;
			const { nombre, activo, fk_departamento } = req.body;

			await Provincia.update(
				{
					nombre,
					activo,
					fk_departamento,
				},
				{
					where: {
						provincia_id: ID,
					},
				}
			);

			const filaActualizada: Provincia | null = await Provincia.findOne({
				// Condiciones para obtener el registro actualizado
				where: { provincia_id: ID },
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

			const ID = req.query.provincia_id;

			if (ID === undefined) {
				respuestaJson = {
					code: 404,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [provincia_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			await Provincia.destroy({
				where: {
					provincia_id: ID,
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
