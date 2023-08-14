import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { ProvinciaSend } from "../interfaces/provincia.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class ProvinciaController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = ProvinciaSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: ProvinciaSend[] = await prisma.provincia.findMany({
				where: { activo: true },
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = ProvinciaSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.provincia_id);

			const result: tipo = await prisma.provincia.findUnique({
				where: {
					provincia_id: ID,
				},
			});
			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = ProvinciaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const { provincia_id, nombre, activo, fk_departamento } = req.body;
			const result: tipo = await prisma.provincia.create({
				data: {
					provincia_id,
					nombre,
					activo,
					fk_departamento,
				},
			});

			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = ProvinciaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.provincia_id);

			const { nombre, activo, fk_departamento } = req.body;

			const result: tipo = await prisma.provincia.update({
				data: {
					nombre,
					activo,
					fk_departamento,
				},
				where: {
					provincia_id: ID,
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = ProvinciaSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.provincia_id);

			const result: ProvinciaSend = await prisma.provincia.delete({
				where: {
					provincia_id: ID,
				},
			});

			return result;
		});
	}
}
