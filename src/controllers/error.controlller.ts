import { Response } from "express";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { RespuestaTokenEntity } from "../entity/respuestacredenciales.entity";
import { ErrorModel } from "../models/error.models";
import { convertirFechaLocal } from "../utils/funciones.utils";

export class ErrorController {
	static async grabarError(codigo: number, error: any, res: Response) {
		const respuestaJson: RespuestaEntity = {
			code: codigo,
			data: [{}],
			error: {
				code: error.parent.number,
				message: error.message,
			},
		};

		try {
			await ErrorModel.create({
				codigo: error.parent.number,
				linea: error.parent.lineNumber,
				objeto: error.parent.procName,
				mensaje: error.message,
				servidor: error.parent.serverName,
				fecha_registro: convertirFechaLocal(),
				fk_usuario: "B966B248-3CA9-48BE-91E3-2FE78027AA68",
			});

			res.status(codigo).json(respuestaJson);
		} catch (error) {
			console.log(error);
		}
	}

	static async grabarErrorToken(codigo: number, _error: any, res: Response) {
		const respuestaJson: RespuestaTokenEntity = {
			code: codigo,
			data: "",
			error: {
				code: 0,
				message: _error.message,
			},
		};

		try {
			await ErrorModel.create({
				codigo: 0,
				linea: _error.parent.lineNumber,
				objeto: _error.parent.procName,
				mensaje: _error.message,
				servidor: _error.parent.serverName,
				fecha_registro: convertirFechaLocal(),
				fk_usuario: "B966B248-3CA9-48BE-91E3-2FE78027AA68",
			});

			res.status(codigo).json(respuestaJson);
		} catch (error) {
			console.log(error);
		}
	}
}
