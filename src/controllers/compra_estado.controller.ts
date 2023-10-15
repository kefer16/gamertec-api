import { Request, Response } from "express";
import { prisma } from "../config/conexion";

import { ejecutarOperacion } from "../utils/funciones.utils";
import { CompraEstadoListaTodos, CompraEstadoListaUno } from "../interfaces/compra_estado.interface";

export class CompraEstadoController {

	static async listarTodos(req: Request, res: Response) {
		type tipo = CompraEstadoListaTodos[];

		await ejecutarOperacion<tipo>(req, res, async () => {
			const result: tipo = await prisma.compra_estado.findMany({
				where:{
					activo: true
				},
				orderBy: {
					fecha_registro: "desc",
				},
			});

			return result;
		});
	}

	static async listarUno(req: Request, res: Response) {
		type tipo = CompraEstadoListaUno | null;

		await ejecutarOperacion<tipo>(req, res, async () => {
			const ID = Number(req.query.comentario_id);

			const result = await prisma.compra_estado.findUnique({
				where: {
					compra_estado_id: ID,
				},
			});

			return result;
		});
	}
}
