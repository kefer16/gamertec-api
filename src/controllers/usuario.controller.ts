import { Request, Response } from "express";
import {
	UsuarioHistorialSend,
	UsuarioSend,
} from "../interfaces/usuario.interface";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class UsuarioController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = UsuarioSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.usuario.findMany({
				orderBy: { fecha_registro: "desc" },
			});

			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = UsuarioSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.usuario_id);

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
			return result;
		});
	}
	static async registrar(req: Request, res: Response) {
		type tipo = UsuarioSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
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

			const result: tipo = await prisma.usuario.create({
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

			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = UsuarioSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.usuario_id);

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

			const result: tipo = await prisma.usuario.update({
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

			return result;
		});
	}

	static async login(req: Request, res: Response) {
		type tipo = UsuarioSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const { usuario, contrasenia } = req.body;

			const result: tipo = await prisma.usuario.findUnique({
				where: {
					usuario: usuario,
					contrasenia: contrasenia,
				},
			});

			return result;
		});
	}

	static async historial(req: Request, res: Response) {
		type tipo = UsuarioHistorialSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.usuario_id);

			const result: tipo = await prisma.usuario_historial.findMany({
				where: {
					usuario_id: ID,
				},
				orderBy: {
					fecha_final: "desc",
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = UsuarioSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.usuario_id);

			const result: tipo = await prisma.usuario.delete({
				where: {
					usuario_id: ID,
				},
			});
			return result;
		});
	}
}
