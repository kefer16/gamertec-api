import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import {
	ModeloDescripcionSend,
	ModeloPorFiltroSend,
	ModeloSend,
} from "../interfaces/modelo.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";

export class ModeloController {
	static async listarTodos(req: Request, res: Response) {
		type tipo = ModeloSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.modelo.findMany({
				orderBy: {
					fecha_registro: "desc",
				},
			});

			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = ModeloSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.modelo_id);

			const result: tipo = await prisma.modelo.findUnique({
				where: {
					modelo_id: ID,
				},
			});

			return result;
		});
	}

	static async registrar(req: Request, res: Response) {
		type tipo = ModeloSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const {
				nombre,
				descripcion,
				foto,
				caracteristicas,
				color,
				precio,
				fecha_registro,
				stock,
				numero_series,
				activo,
				fk_marca,
				fk_categoria,
			} = req.body;

			const result: tipo = await prisma.modelo.create({
				data: {
					nombre,
					descripcion,
					foto,
					caracteristicas,
					color,
					precio,
					fecha_registro,
					stock,
					numero_series,
					activo,
					fk_marca,
					fk_categoria,
				},
			});

			return result;
		});
	}

	static async actualizar(req: Request, res: Response) {
		type tipo = ModeloSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.modelo_id);

			const {
				nombre,
				descripcion,
				foto,
				caracteristicas,
				color,
				precio,
				fecha_registro,
				stock,
				numero_series,
				activo,
				fk_marca,
				fk_categoria,
			} = req.body;

			const result: tipo = await prisma.modelo.update({
				data: {
					nombre,
					descripcion,
					foto,
					caracteristicas,
					color,
					precio,
					fecha_registro,
					stock,
					numero_series,
					activo,
					fk_marca,
					fk_categoria,
				},
				where: {
					modelo_id: ID,
				},
			});

			return result;
		});
	}

	static async eliminarUno(req: Request, res: Response) {
		type tipo = ModeloSend;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.modelo_id);

			const result: tipo = await prisma.modelo.delete({
				where: {
					modelo_id: ID,
				},
			});

			return result;
		});
	}

	static async listarModelosPorFiltro(req: Request, res: Response) {
		type tipo = ModeloPorFiltroSend[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const _categoria_id = Number(req.query.categoria_id);
			const _nombre_modelo = String(req.query.nombre_modelo);

			const _case_where =
				_categoria_id === 0 ? {} : { categoria_id: _categoria_id };

			const result: tipo = await prisma.modelo.findMany({
				select: {
					modelo_id: true,
					nombre: true,
					descripcion: true,
					caracteristicas: true,
					precio: true,
					color: true,
					foto: true,
					stock: true,
					cls_marca: {
						select: {
							marca_id: true,
							nombre: true,
						},
					},
				},
				where: {
					descripcion: {
						contains: _nombre_modelo,
					},
					cls_marca: {
						cls_categoria: _case_where,
					},
				},
			});

			return result;
		});
	}
	static async listaModeloDescripcion(req: Request, res: Response) {
		type tipo = ModeloDescripcionSend | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const _modelo_id = Number(req.query.modelo_id);

			const result: tipo = await prisma.modelo.findUnique({
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
							cls_categoria: {
								select: {
									categoria_id: true,
									nombre: true,
								},
							},
						},
					},
				},
				where: {
					modelo_id: _modelo_id,
				},
			});

			return result;
		});
	}
}
