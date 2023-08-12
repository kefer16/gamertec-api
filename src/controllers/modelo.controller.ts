import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { prisma } from "../config/conexion";
import {
	ModeloDescripcionSend,
	ModeloPorFiltroSend,
	ModeloSend,
} from "../interfaces/modelo.interface";

export class ModeloController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<ModeloSend[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result = await prisma.modelo.findMany({
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
			ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
		}
	}

	static async listarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<ModeloSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.modelo_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: ModeloSend | null = await prisma.modelo.findUnique({
				where: {
					modelo_id: ID,
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
	static async registrar(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<ModeloSend> = new RespuestaEntity();
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

			const result = await prisma.modelo.create({
				data: {
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
		let respuestaJson: RespuestaEntity<ModeloSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const ID = Number(req.query.modelo_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

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

			const result: ModeloSend = await prisma.modelo.update({
				data: {
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
				where: {
					modelo_id: ID,
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
		let respuestaJson: RespuestaEntity<ModeloSend> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.modelo_id);

			if (Number.isNaN(ID)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result = await prisma.modelo.delete({
				where: {
					modelo_id: ID,
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

	static async listarModelosPorFiltro(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<ModeloPorFiltroSend[]> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			let _categoria_id = Number(req.query.categoria_id);
			let _nombre_modelo = String(req.query.nombre_modelo);

			if (Number.isNaN(_categoria_id)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			if (_nombre_modelo === undefined) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [nombre_modelo] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const _case_where =
				_categoria_id === 0 ? {} : { categoria_id: _categoria_id };

			const result: ModeloPorFiltroSend[] = await prisma.modelo.findMany({
				select: {
					modelo_id: true,
					nombre: true,
					descripcion: true,
					caracteristicas: true,
					precio: true,
					color: true,
					foto: true,
					stock: true,
					cls_marca: {
						select: {
							marca_id: true,
							nombre: true,
						},
					},
				},
				where: {
					descripcion: {
						contains: _nombre_modelo,
					},
					cls_marca: {
						cls_categoria: _case_where,
					},
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
	static async listaModeloDescripcion(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<ModeloDescripcionSend> =
			new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const _modelo_id = Number(req.query.modelo_id);

			if (Number.isNaN(_modelo_id)) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "no se envió la variable [modelo_id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: ModeloDescripcionSend | null = await prisma.modelo.findUnique({
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
							cls_categoria: {
								select: {
									categoria_id: true,
									nombre: true,
								},
							},
						},
					},
				},
				where: {
					modelo_id: _modelo_id,
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
}
