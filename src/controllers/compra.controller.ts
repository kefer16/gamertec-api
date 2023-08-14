import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import {
	CompraCabeceraSend,
	CompraDetalleSend,
	CompraSend,
	CompraUsuarioSend,
} from "../interfaces/compra.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class CompraController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = CompraSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.compra_cabecera.findMany({
				select: {
					compra_cabecera_id: true,
					codigo: true,
					direccion: true,
					telefono: true,
					sub_total: true,
					costo_envio: true,
					total: true,
					fecha_registro: true,
					activo: true,
					lst_compra_detalle: {
						select: {
							compra_detalle_id: true,
							item: true,
							cantidad: true,
							precio: true,
							total: true,
							serie: true,
							fecha_registro: true,
							activo: true,
						},
					},
				},
				orderBy: {
					fecha_registro: "desc",
				},
			});
			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = CompraSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.compra_cabecera_id);

			const result: tipo = await prisma.compra_cabecera.findUnique({
				select: {
					compra_cabecera_id: true,
					codigo: true,
					direccion: true,
					telefono: true,
					sub_total: true,
					costo_envio: true,
					total: true,
					fecha_registro: true,
					activo: true,
					lst_compra_detalle: {
						select: {
							compra_detalle_id: true,
							item: true,
							cantidad: true,
							precio: true,
							total: true,
							serie: true,
							fecha_registro: true,
							activo: true,
						},
					},
				},
				where: {
					compra_cabecera_id: ID,
				},
			});
			return result;
		});
	}

	static async listarUltimo(req: Request, res: Response) {
		type tipo = CompraCabeceraSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.compra_cabecera.findFirst({
				orderBy: {
					fk_pedido_cabecera: "desc",
				},
			});
			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = boolean;

		await ejecutarOperacion<tipo>(req, res, async () => {
			await prisma.$transaction(async (prisma) => {
				const compra_cabecera: CompraCabeceraSend = req.body.compra_cabecera;

				const result_cabecera: CompraCabeceraSend =
					await prisma.compra_cabecera.create({
						data: compra_cabecera,
					});

				let compra_detalle: CompraDetalleSend[] = req.body.array_compra_detalle;

				compra_detalle = compra_detalle.map((item: CompraDetalleSend) => ({
					...item,
					fk_compra_cabecera: Number(result_cabecera.compra_cabecera_id),
				}));

				const result_detalle = await prisma.compra_detalle.createMany({
					data: compra_detalle,
				});

				return { result_cabecera, result_detalle };
			});

			return true;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = boolean;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.compra_cabecera_id);

			await prisma.$transaction(async (prisma) => {
				const compra_cabecera: CompraCabeceraSend = req.body.compra_cabecera;

				const result_cabecera = await prisma.compra_cabecera.update({
					data: compra_cabecera,
					where: {
						compra_cabecera_id: ID,
					},
				});
				const compra_detalle: CompraDetalleSend[] = req.body.compra_cabecera;

				const result_detalle = await prisma.compra_detalle.updateMany({
					data: compra_detalle,
					where: { fk_compra_cabecera: ID },
				});
				return { result_cabecera, result_detalle };
			});
			return true;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = CompraCabeceraSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.compra_cabecera_id);

			const result: tipo = await prisma.compra_cabecera.delete({
				where: {
					compra_cabecera_id: ID,
				},
			});
			return result;
		});
	}

	static async listarComprasUsuario(req: Request, res: Response) {
		type tipo = CompraUsuarioSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const usuario_id: number = Number(req.query.usuario_id);

			const result: tipo = await prisma.compra_cabecera.findMany({
				select: {
					compra_cabecera_id: true,
					codigo: true,
					sub_total: true,
					costo_envio: true,
					total: true,
					fecha_registro: true,
					activo: true,
					lst_compra_detalle: {
						select: {
							compra_detalle_id: true,
							item: true,
							cantidad: true,
							precio: true,
							total: true,
							fecha_registro: true,
							activo: true,
						},
					},
				},
				where: {
					fk_usuario: usuario_id,
					activo: true,
				},
			});
			return result;
		});
	}
}
