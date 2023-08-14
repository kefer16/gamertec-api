import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { DepartamentoSend } from "../interfaces/departamento.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class DepartamentoController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = DepartamentoSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.departamento.findMany({
				where: { activo: true },
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = DepartamentoSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.departamento_id);

			const result: DepartamentoSend | null = await prisma.departamento.findUnique(
				{
					where: {
						departamento_id: ID,
					},
				}
			);
			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = DepartamentoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const { departamento_id, nombre, costo_envio, activo } = req.body;

			const result: tipo = await prisma.departamento.create({
				data: {
					departamento_id,
					nombre,
					costo_envio,
					activo,
				},
			});
			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = DepartamentoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.departamento_id);

			const { nombre, costo_envio, activo } = req.body;

			const result: tipo = await prisma.departamento.update({
				data: {
					nombre,
					costo_envio,
					activo,
				},

				where: {
					departamento_id: ID,
				},
			});
			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = DepartamentoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.departamento_id);

			const result: tipo = await prisma.departamento.delete({
				where: {
					departamento_id: ID,
				},
			});
			return result;
		});
	}
}
