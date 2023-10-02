import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import {
	PedidoCabeceraListarUnoSend,
	IPedidoCabecera,
	PedidoCabeceraUsuarioSend,
	IActualizaSerie,
	IPedidoDetalleProductoId,
	PedidoPreferencia,
	RespuestaPedidoPreferencia,
} from "../interfaces/pedido_cabecera.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";
import mercadopago from "mercadopago";
import { CreatePreferencePayload, PreferenceItem } from "mercadopago/models/preferences/create-payload.model";
export class PedidoController {

	static async crearPreferencia(req: Request, res: Response) {

		const itemsPreferencia : PreferenceItem[] = [];
		const itemsBody: PedidoPreferencia[] = req.body;
		console.log(itemsBody);
		

		itemsBody.forEach((element: PedidoPreferencia) => {
			itemsPreferencia.push({title: element.cls_modelo.nombre, unit_price: element.precio,quantity:element.cantidad})
		});

		let preference: CreatePreferencePayload = {
			items: itemsPreferencia,
			back_urls: {
			  success: "http://localhost:3001/buy/",
			  failure: "http://localhost:3001/failted/",
			  pending: "",
			},
			auto_return: "approved",
		};
		
		mercadopago.preferences
			.create(preference)
			.then(function (response) {
				const ID : RespuestaPedidoPreferencia = {id :response.body.id } 
				const respuestaJson = {
					code: 200,
					data: ID,
					error: {
						code: "0",
						message: "",
					},
				};
				res.status(200).json(respuestaJson);
			})
			.catch(function (error) {
				console.log(error);
			});
		
		// await ejecutarOperacion<tipo>(req, res, async () => {
		// 	const result: tipo = await prisma.pedido_cabecera.findMany({
		// 		orderBy: {
		// 			fecha_registro: "desc",
		// 		},
		// 	});

		// 	return result;
		// });
	}
	static async listarTodos(req: Request, res: Response) {
		type tipo = IPedidoCabecera[];

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
		type tipo = IPedidoCabecera | null;

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
			const usuario_id = Number(req.body.usuario_id);
			const distrito_id = Number(req.body.distrito_id);
			const fecha_registro = req.body.fecha_registro;

			// const query: string = ``;
			// console.log(query);

			const result = prisma.$executeRaw`exec sp_registrar_pedido @usuario_id = ${usuario_id}, @distrito_id = ${distrito_id}, @fecha_registro = ${fecha_registro}`;

			await prisma.$transaction([result]);

			return true;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = IPedidoCabecera;

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
			// const usuario_id: number = Number(req.query.usuario_id);

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
					// fk_usuario: usuario_id,
					activo: true,
					comprado: false,
				},
				orderBy: {
					fecha_registro: "desc",
				},
			});

			return result;
		});
	}
	static async agregarSeries(req: Request, res: Response) {
		type tipo = number;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID: number = Number(req.query.pedido_detalle_id);

			const series: IActualizaSerie[] = req.body;

			const detalle: IPedidoDetalleProductoId[] =
				await prisma.pedido_detalle_producto.findMany({
					select: {
						pedido_detalle_producto_id: true,
					},
					where: {
						fk_pedido_detalle: ID,
					},
				});

			const updatePromises: Promise<any>[] = [];
			console.log("detalle", detalle);

			let i = 0;
			series.forEach((element: IActualizaSerie) => {
				const updatePromise = prisma.pedido_detalle_producto.update({
					data: {
						numero_serie: element.numero_serie,
						fk_producto: element.fk_producto,
					},
					where: {
						pedido_detalle_producto_id: detalle[i].pedido_detalle_producto_id,
					},
				});
				i = i + 1;
				updatePromises.push(updatePromise);
			});

			await Promise.all(updatePromises);

			return 1;
		});
	}
}
