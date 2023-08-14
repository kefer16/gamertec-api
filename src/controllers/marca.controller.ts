import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { MarcaSend } from "../interfaces/marca.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class MarcaController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = MarcaSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.marca.findMany({
				orderBy: { fecha_registro: "desc" },
			});

			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = MarcaSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.marca_id);

			const result: tipo = await prisma.marca.findUnique({
				where: {
					marca_id: ID,
				},
			});
			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = MarcaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const { nombre, activo, fk_categoria, fecha_registro } = req.body;

			const result: tipo = await prisma.marca.create({
				data: {
					nombre,
					activo,
					fk_categoria,
					fecha_registro,
				},
			});
			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = MarcaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.marca_id);

			const { nombre, activo, fk_categoria, fecha_registro } = req.body;

			const result: tipo = await prisma.marca.update({
				data: {
					nombre,
					activo,
					fk_categoria,
					fecha_registro,
				},
				where: {
					marca_id: ID,
				},
			});
			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = MarcaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.marca_id);

			const result: tipo = await prisma.marca.delete({
				where: {
					marca_id: ID,
				},
			});

			return result;
		});
	}
}
