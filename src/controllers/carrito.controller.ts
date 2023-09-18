import { Request, Response } from "express";
import {
	CarritoCantidadUsuario,
	CarritoSend,
	CarritoUsuarioSend,
} from "../interfaces/carrito.interface";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { PrismaPromise } from "@prisma/client";

export class CarritoController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = CarritoSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.carrito.findMany({
				orderBy: {
					fecha_registro: "desc",
				},
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = CarritoSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.carrito_id);

			const result: tipo = await prisma.carrito.findUnique({
				where: {
					carrito_id: ID,
				},
			});
			return result;
		});
	}
	static async registrar(req: Request, res: Response) {
		type tipo = CarritoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const {
				cantidad,
				precio_total,
				despues,
				pedido,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			const result: tipo = await prisma.carrito.create({
				data: {
					cantidad,
					precio_total,
					despues,
					pedido,
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
		type tipo = CarritoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.carrito_id);
			const {
				cantidad,
				precio_total,
				despues,
				pedido,
				fecha_registro,
				activo,
				fk_usuario,
				fk_modelo,
			} = req.body;

			const result: tipo = await prisma.carrito.update({
				data: {
					cantidad,
					precio_total,
					despues,
					pedido,
					fecha_registro,
					activo,
					fk_usuario,
					fk_modelo,
				},
				where: {
					carrito_id: ID,
				},
			});

			return result;
		});
	}
	static async eliminarUno(req: Request, res: Response) {
		type tipo = CarritoSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.carrito_id);

			const result: tipo = await prisma.carrito.delete({
				where: {
					carrito_id: ID,
				},
			});

			return result;
		});
	}

	static async obtenerCarritoPorUsuario(req: Request, res: Response) {
		type tipo = CarritoUsuarioSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.usuario_id);
			const result: tipo = await prisma.carrito.findMany({
				select: {
					carrito_id: true,
					cantidad: true,
					fecha_registro: true,
					activo: true,
					cls_modelo: {
						select: {
							modelo_id: true,
							nombre: true,
							descripcion: true,
							caracteristicas: true,
							precio: true,
							foto: true,
							color: true,
							stock: true,
							cls_marca: {
								select: {
									marca_id: true,
									nombre: true,
								},
							},
						},
					},
				},
				where: {
					fk_usuario: ID,
					activo: true,
					pedido: false,
				},
			});
			return result;
		});
	}
	static async obtenerCantidadCarrito(req: Request, res: Response) {
		type tipo = CarritoCantidadUsuario;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.usuario_id);

			const result: PrismaPromise<tipo> = prisma.$queryRaw`exec sp_obtener_cantidad_carrito @usuario_id = ${ID}`;

			return result;
		});
	}

}
