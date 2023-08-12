import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entities/respuesta.entity";
import {
	UsuarioHistorialSend,
	UsuarioSend,
} from "../interfaces/usuario.interface";
import { prisma } from "../config/conexion";

export class UsuarioController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<UsuarioSend[]> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const result = await prisma.usuario.findMany({
				orderBy: { fecha_registro: "desc" },
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
			console.log(error);
			codigo = 500;
			await ErrorController.grabarError(codigo, error, res);
		} finally {
			await ApiEnvioController.grabarRespuestaAPI(code_send, respuestaJson, res);
			prisma.$disconnect;
		}
	}

	static async listarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<UsuarioSend | null> =
			new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const ID: number = Number(req.query.usuario_id);

			if (Number.isNaN(ID)) {
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
			const result: UsuarioSend | null = await prisma.usuario.findUnique({
				include: {
					privilegio: {
						select: {
							privilegio_id: true,
							tipo: true,
						},
					},
				},
				where: { usuario_id: ID },
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
		let respuestaJson: RespuestaEntity<UsuarioSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const {
				nombre,
				apellido,
				correo,
				usuario,
				contrasenia,
				dinero,
				foto,
				fecha_registro,
				fk_privilegio,
				direccion,
				telefono,
			} = req.body;

			const result = await prisma.usuario.create({
				data: {
					nombre: nombre,
					apellido: apellido,
					correo: correo,
					usuario: usuario,
					contrasenia: contrasenia,
					dinero: dinero,
					foto: foto,
					fecha_registro: fecha_registro,
					activo: true,
					fk_privilegio: fk_privilegio,
					direccion: direccion,
					telefono: telefono,
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
		let respuestaJson: RespuestaEntity<UsuarioSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const ID: number = Number(req.query.usuario_id);

			if (Number.isNaN(ID)) {
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

			const {
				nombre,
				apellido,
				correo,
				usuario,
				contrasenia,
				dinero,
				foto,
				activo,
				fk_privilegio,
				direccion,
				telefono,
			} = req.body;

			const result = await prisma.usuario.update({
				data: {
					nombre: nombre,
					apellido: apellido,
					correo: correo,
					usuario: usuario,
					contrasenia: contrasenia,
					dinero: dinero,
					foto: foto,
					activo: activo,
					fk_privilegio: fk_privilegio,
					direccion: direccion,
					telefono: telefono,
				},
				where: { usuario_id: ID },
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

	static async login(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<UsuarioSend> = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const { usuario, contrasenia } = req.body;

			const usuarioLogeado: UsuarioSend | null = await prisma.usuario.findUnique({
				where: {
					usuario: usuario,
					contrasenia: contrasenia,
				},
			});

			if (!usuarioLogeado) {
				respuestaJson = {
					code: 404,
					data: null,
					error: {
						code: 0,
						message: "usuario o contrasenia incorrecta",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			respuestaJson = {
				code: codigo,
				data: usuarioLogeado,
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

	static async historial(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity<UsuarioHistorialSend[]> =
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

			const result: UsuarioHistorialSend[] =
				await prisma.usuario_historial.findMany({
					where: {
						usuario_id: ID,
					},
					orderBy: {
						fecha_final: "desc",
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
		let respuestaJson: RespuestaEntity<null> = new RespuestaEntity();
		let codigo: number = 200;

		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);

			const ID = Number(req.query.usuario_id);

			if (Number.isNaN(ID)) {
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
			await prisma.usuario.delete({
				where: {
					usuario_id: ID,
				},
			});

			respuestaJson = {
				code: codigo,
				data: null,
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
