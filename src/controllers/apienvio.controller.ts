import { Request, Response } from "express";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { RespuestaTokenEntity } from "../entity/respuestacredenciales.entity";

import { ApiEnvioModel } from "../models/apienvio.models";
import { obtenerFechaLocal } from "../utils/funciones.utils";

export class ApiEnvioController {
	static async grabarEnvioAPI(code_send: string, req: Request) {
		await ApiEnvioModel.create({
			codigo_envio: code_send,
			tipo_peticion: req.method.toString() ?? "",
			url:
				"http://" +
				req.headers.host?.toString() +
				"/" +
				req.hostname.toString() +
				req.originalUrl.toString(),
			parametros: JSON.stringify(req.query) ?? "",
			llave: req.headers.authorization?.toString() ?? "",
			cabeceras: JSON.stringify(req.headers) ?? "",
			tipo_contenido: req.headers["content-type"]?.toString() ?? "",
			cuerpo: JSON.stringify(req.body) ?? "",
			respuesta: "",
			agente: req.headers["user-agent"]?.toString() ?? "",
			fecha_creacion: obtenerFechaLocal(),
			fk_usuario: 1,
			estatus: "",
		});
	}

	static async grabarRespuestaAPI(
		code_send: string,
		data: RespuestaEntity | RespuestaTokenEntity,
		res: Response
	) {
		await ApiEnvioModel.create({
			codigo_envio: code_send,
			tipo_peticion: "",
			url: "",
			parametros: "",
			llave: "",
			cabeceras: "",
			tipo_contenido: "",
			cuerpo: "",
			respuesta: JSON.stringify(data) ?? "",
			agente: "",
			fecha_creacion: obtenerFechaLocal(),
			fk_usuario: 1,
			estatus: res.statusCode.toString() ?? "",
		});
	}
}
