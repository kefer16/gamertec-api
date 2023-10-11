import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import {
	IProductoSerie,
	ProductoSend,
} from "../interfaces/productos.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { PrismaPromise } from "@prisma/client";

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
				comprado
			} = req.body;

			const result: tipo = await prisma.producto.create({
				data: {
					numero_serie,
					fk_modelo,
					fk_marca,
					fk_categoria,
					fecha_registro,
					activo,
					comprado
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

	static async series(req: Request, res: Response) {
		type tipo = IProductoSerie[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.detalle_id);
			const usuario_id = String(req.query.usuario_id);

			const result: PrismaPromise<tipo> = prisma.$queryRaw`exec sp_listar_producto_series @detalle_id = ${ID}, @usuario_id = ${usuario_id}`;

			return result;
		});
	}
}
