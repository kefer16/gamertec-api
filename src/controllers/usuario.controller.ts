import { Request, Response } from "express";
import { Usuario } from "../models/usuario.models";
import { v4 as uuidv4 } from "uuid";
import { ErrorController } from "./error.controlller";
import { ApiEnvioController } from "./apienvio.controller";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { obtenerFechaLocal } from "../utils/funciones.utils";
import { where } from "sequelize";

export class UsuarioController {
	static async listarTodos(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();
			const result = await Usuario.findAll();
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

	static async listarUno(req: Request, res: Response) {
		const code_send = uuidv4();
		let respuestaJson: RespuestaEntity = new RespuestaEntity();
		let codigo: number = 200;
		try {
			await ApiEnvioController.grabarEnvioAPI(code_send, req);
			// await sequelize.authenticate();

			const idUsuario = req.query.id;

			if (idUsuario === undefined) {
				codigo = 400;
				respuestaJson = {
					code: codigo,
					data: [{}],
					error: {
						code: 0,
						message: "no se envió la variable [id] como parametro",
					},
				};
				return res.status(codigo).json(respuestaJson);
			}

			const result: Usuario | null = await Usuario.findOne({
				where: {
					id: idUsuario,
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
				apellido,
				correo,
				usuario,
				contrasenia,
				dinero,
				foto,
				fk_privilegio,
			} = req.body;

			const result: Usuario = await Usuario.create({
				nombre: nombre,
				apellido: apellido,
				correo: correo,
				usuario: usuario,
				contrasenia: contrasenia,
				dinero: dinero,
				foto: foto,
				fecha_registro: obtenerFechaLocal(),
				activo: 1,
				fk_privilegio: fk_privilegio,
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
			const idUsuario = req.query.id;
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
			} = req.body;

			await Usuario.update(
				{
					nombre: nombre,
					apellido: apellido,
					correo: correo,
					usuario: usuario,
					contrasenia: contrasenia,
					dinero: dinero,
					foto: foto,
					activo: activo,
					fk_privilegio: fk_privilegio,
				},
				{
					where: {
						id: idUsuario,
					},
				}
			);

			const filaActaulizada: Usuario | null = await Usuario.findOne({
				// Condiciones para obtener el registro actualizado
				where: { id: idUsuario },
			});
			respuestaJson = {
				code: codigo,
				data: [filaActaulizada ?? {}],
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
		const { username, password } = req.body;

		const user = await Usuario.findOne({ where: { username, password } });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Generate and save token for user
		const token = "generated-token";
		//  user.token = token;
		//  await user.save();

		return res.json({ token });
	}
}
