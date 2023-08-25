import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { DistritoSend } from "../interfaces/distrito.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class DistritoController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = DistritoSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.distrito.findMany({
				where: { activo: true },
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = DistritoSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.distrito_id);

			const result: tipo = await prisma.distrito.findUnique({
				where: {
					distrito_id: ID,
				},
			});

			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = DistritoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const {
				distrito_id,
				nombre,
				activo,
				costo_envio,
				fk_provincia,
				fk_departamento,
			} = req.body;

			const result: tipo = await prisma.distrito.create({
				data: {
					distrito_id,
					nombre,
					activo,
					costo_envio,
					fk_provincia,
					fk_departamento,
				},
			});

			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = DistritoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.distrito_id);

			const { nombre, activo, fk_provincia, fk_departamento } = req.body;

			const result: tipo = await prisma.distrito.update({
				data: {
					nombre,
					activo,
					fk_provincia,
					fk_departamento,
				},
				where: {
					distrito_id: ID,
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = DistritoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.distrito_id);

			const result: tipo = await prisma.distrito.delete({
				where: {
					distrito_id: ID,
				},
			});

			return result;
		});
	}
}
