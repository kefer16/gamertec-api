import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { CategoriaSend } from "../interfaces/categoria.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class CategoriaController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = CategoriaSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.categoria.findMany({
				orderBy: {
					fecha_actualizacion: "desc",
				},
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = CategoriaSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.categoria_id);

			const result: tipo = await prisma.categoria.findUnique({
				where: {
					categoria_id: ID,
				},
			});
			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = CategoriaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const { nombre, activo, fecha_registro, fecha_actualizacion } = req.body;

			const result: tipo = await prisma.categoria.create({
				data: {
					nombre,
					activo,
					fecha_registro,
					fecha_actualizacion,
				},
			});
			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = CategoriaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.categoria_id);

			const { nombre, activo, fecha_registro, fecha_actualizacion } = req.body;

			const result: tipo = await prisma.categoria.update({
				data: {
					nombre,
					activo,
					fecha_registro,
					fecha_actualizacion,
				},
				where: {
					categoria_id: ID,
				},
			});
			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = CategoriaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.categoria_id);

			const result: tipo = await prisma.categoria.delete({
				where: {
					categoria_id: ID,
				},
			});

			return result;
		});
	}
}
