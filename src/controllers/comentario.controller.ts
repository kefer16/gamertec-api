import { Request, Response } from "express";
import { prisma } from "../config/conexion";

import { ejecutarOperacion } from "../utils/funciones.utils";
import { ComentarioSend } from "../interfaces/comentario.interface";

export class ComentarioController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = ComentarioSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.comentario.findMany({
				orderBy: {
					fecha_registro: "desc",
				},
			});

			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = ComentarioSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.comentario_id);

			const result: tipo = await prisma.comentario.findUnique({
				where: {
					comentario_id: ID,
				},
			});

			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = ComentarioSend;
		await ejecutarOperacion<tipo>(req, res, async () => {
			const {
				valoracion,
				usuario,
				titulo,
				mensaje,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			const result: tipo = await prisma.comentario.create({
				data: {
					valoracion,
					usuario,
					titulo,
					mensaje,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
			});

			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = ComentarioSend;
		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.comentario_id);

			const {
				valoracion,
				usuario,
				titulo,
				mensaje,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			const result = await prisma.comentario.update({
				data: {
					valoracion,
					usuario,
					titulo,
					mensaje,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
				where: {
					comentario_id: ID,
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = ComentarioSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.comentario_id);

			const result: tipo = await prisma.comentario.delete({
				where: {
					comentario_id: ID,
				},
			});

			return result;
		});
	}

	static async buscarPorModelo(req: Request, res: Response) {
		type tipo = ComentarioSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.modelo_id);

			const result: tipo = await prisma.comentario.findMany({
				where: {
					fk_modelo: ID,
				},
				orderBy: {
					fecha_registro: "desc",
				},
			});

			return result;
		});
	}
}
