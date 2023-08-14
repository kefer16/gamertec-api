import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import {
	PedidoCabeceraListarUnoSend,
	PedidoCabeceraSend,
	PedidoCabeceraUsuarioSend,
} from "../interfaces/pedido_cabecera.interface";
import {
	PedidoDetalleSend,
	PedidoDetalleSinIdModel,
} from "../interfaces/pedido_detalle.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class PedidoController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = PedidoCabeceraSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.pedido_cabecera.findMany({
				orderBy: {
					fecha_registro: "desc",
				},
			});

			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = PedidoCabeceraListarUnoSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.pedido_id);

			const result: tipo = await prisma.pedido_cabecera.findUnique({
				select: {
					pedido_cabecera_id: true,
					codigo: true,
					direccion: true,
					telefono: true,
					sub_total: true,
					costo_envio: true,
					total: true,
					fecha_registro: true,
					activo: true,
					lst_pedido_detalle: {
						select: {
							pedido_detalle_id: true,
							item: true,
							cantidad: true,
							precio: true,
							total: true,
							fecha_registro: true,
							activo: true,
							cls_modelo: {
								select: {
									modelo_id: true,
									nombre: true,
									descripcion: true,
									foto: true,
								},
							},
						},
					},
				},
				where: {
					pedido_cabecera_id: ID,
				},
			});

			return result;
		});
	}

	static async listarUltimo(req: Request, res: Response) {
		type tipo = PedidoCabeceraSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.pedido_cabecera.findFirst({
				orderBy: {
					pedido_cabecera_id: "desc",
				},
			});

			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = boolean;

		await ejecutarOperacion<tipo>(req, res, async () => {
			await prisma.$transaction(async (prisma) => {
				const pedido_cabecera: PedidoCabeceraSend = req.body.pedido_cabecera;

				const result_cabecera = await prisma.pedido_cabecera.create({
					data: pedido_cabecera,
				});

				let pedido_detalle: PedidoDetalleSend[] = req.body.array_pedido_detalle;

				pedido_detalle = pedido_detalle.map((item: PedidoDetalleSinIdModel) => ({
					...item,
					fk_pedido_cabecera: Number(result_cabecera.pedido_cabecera_id),
				}));

				const result_detalle = await prisma.pedido_detalle.createMany({
					data: pedido_detalle,
				});

				const resultCarrito = await prisma.carrito.updateMany({
					where: {
						pedido: {
							equals: false,
						},
						activo: {
							equals: true,
						},
						despues: {
							equals: false,
						},
					},
					data: {
						pedido: true,
					},
				});

				return { result_cabecera, result_detalle, resultCarrito };
			});

			return true;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = PedidoCabeceraSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.pedido_id);

			const {
				pedido_cabecera_id,
				codigo,
				direccion,
				telefono,
				sub_total,
				costo_envio,
				total,
				fecha_registro,
				activo,
				fk_distrito,
				fk_usuario,
			} = req.body;

			const result: tipo = await prisma.pedido_cabecera.update({
				data: {
					pedido_cabecera_id,
					codigo,
					direccion,
					telefono,
					sub_total,
					costo_envio,
					total,
					fecha_registro,
					activo,
					fk_distrito,
					fk_usuario,
				},
				where: {
					pedido_cabecera_id: ID,
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = boolean;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.pedido_id);

			await prisma.$transaction(async (prisma) => {
				const resultPedidoDetalle = await prisma.pedido_cabecera.delete({
					where: {
						pedido_cabecera_id: ID,
					},
				});

				const resultPedidoCabecera = await prisma.pedido_cabecera.delete({
					where: {
						pedido_cabecera_id: ID,
					},
				});

				return { resultPedidoDetalle, resultPedidoCabecera };
			});

			return true;
		});
	}

	static async listarPedidosUsuario(req: Request, res: Response) {
		type tipo = PedidoCabeceraUsuarioSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const usuario_id: number = Number(req.query.usuario_id);

			const result: tipo = await prisma.pedido_cabecera.findMany({
				select: {
					pedido_cabecera_id: true,
					codigo: true,
					sub_total: true,
					costo_envio: true,
					total: true,
					fecha_registro: true,
					activo: true,
					lst_pedido_detalle: {
						select: {
							pedido_detalle_id: true,
							item: true,
							cantidad: true,
							precio: true,
							total: true,
							fecha_registro: true,
							activo: true,
							cls_modelo: {
								select: {
									modelo_id: true,
									nombre: true,
									descripcion: true,
									foto: true,
								},
							},
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
