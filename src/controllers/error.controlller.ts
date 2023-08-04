import { Response } from "express";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { RespuestaTokenEntity } from "../entities/respuestacredenciales.entity";
import { ErrorModel } from "../models/error.models";
import {
	obtenerArchivoError,
	obtenerFechaLocal,
} from "../utils/funciones.utils";

export class ErrorController {
	static async grabarError(codigo: number, error: any, res: Response) {
		const respuestaJson: RespuestaEntity<{}> = {} as RespuestaEntity<{}>;

		try {
			await ErrorModel.create({
				codigo: error.parent === undefined ? 0 : error.parent.number,
				linea: error.parent === undefined ? 0 : error.parent.lineNumber,
				objeto: obtenerArchivoError(error),
				mensaje: error.message,
				servidor: error.parent === undefined ? "" : error.parent.serverName,
				fecha_registro: obtenerFechaLocal(),
				fk_usuario: 1,
			});

			res.status(codigo).json(respuestaJson);
		} catch (error) {
			console.log(error);
		}
	}

	static async grabarSoloError(error: any) {
		try {
			await ErrorModel.create({
				codigo: error.parent === undefined ? 0 : error.parent.number,
				linea: error.parent.lineNumber,
				objeto: obtenerArchivoError(error),
				mensaje: error.message,
				servidor: error.parent.serverName,
				fecha_registro: obtenerFechaLocal(),
				fk_usuario: 1,
			});
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
				fecha_registro: obtenerFechaLocal(),
				fk_usuario: 1,
			});

			res.status(codigo).json(respuestaJson);
		} catch (error) {
			console.log(error);
		}
	}
}
