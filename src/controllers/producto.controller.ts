import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { ProductoSend } from "../interfaces/productos.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class ProductoController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = ProductoSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.producto.findMany({
				orderBy: {
					fecha_registro: "desc",
				},
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = ProductoSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.producto_id);

			const result: tipo = await prisma.producto.findUnique({
				where: {
					producto_id: ID,
				},
			});
			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = ProductoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const {
				numero_serie,
				fk_modelo,
				fk_marca,
				fk_categoria,
				fecha_registro,
				activo,
			} = req.body;

			const result: tipo = await prisma.producto.create({
				data: {
					numero_serie,
					fk_modelo,
					fk_marca,
					fk_categoria,
					fecha_registro,
					activo,
				},
			});
			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = ProductoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.producto_id);

			const {
				numero_serie,
				fk_modelo,
				fk_marca,
				fk_categoria,
				fecha_registro,
				activo,
			} = req.body;

			const result: tipo = await prisma.producto.update({
				data: {
					numero_serie,
					fk_modelo,
					fk_marca,
					fk_categoria,
					fecha_registro,
					activo,
				},
				where: {
					producto_id: ID,
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = ProductoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.producto_id);

			const result: tipo = await prisma.producto.delete({
				where: {
					producto_id: ID,
				},
			});

			return result;
		});
	}
}
