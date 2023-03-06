import { Request, Response } from "express";
import { RespuestaEntity } from "../entity/respuesta.entity";
import { RespuestaTokenEntity } from "../entity/respuestacredenciales.entity";

import { ApiEnvioModel } from "../models/apienvio.models";
import { convertirFechaLocal } from "../utils/funciones.utils";

export class ApiEnvioController {
	static async grabarEnvioAPI(code_send: string, req: Request) {
		await ApiEnvioModel.create({
			send_code: code_send,
			request_type: req.method.toString() ?? "",
			url:
				"http://" +
				req.headers.host?.toString() +
				"/" +
				req.hostname.toString() +
				req.originalUrl.toString(),
			params: JSON.stringify(req.query) ?? "",
			key: req.headers.authorization?.toString() ?? "",
			headers: JSON.stringify(req.headers) ?? "",
			content_type: req.headers["content-type"]?.toString() ?? "",
			body: JSON.stringify(req.body) ?? "",
			response: "",
			user_agent: req.headers["user-agent"]?.toString() ?? "",
			creation_date: convertirFechaLocal(),
			fk_usuario: "CB6A980F-4ABE-434E-B3B5-98376948E100",
			status_code: "",
		});
	}

	static async grabarRespuestaAPI(
		code_send: string,
		data: RespuestaEntity | RespuestaTokenEntity,
		res: Response
	) {
		await ApiEnvioModel.create({
			send_code: code_send,
			request_type: "",
			url: "",
			params: "",
			key: "",
			headers: "",
			content_type: "",
			body: "",
			response: JSON.stringify(data) ?? "",
			user_agent: "",
			creation_date: convertirFechaLocal(),
			fk_usuario: "CB6A980F-4ABE-434E-B3B5-98376948E100",
			status_code: res.statusCode.toString() ?? "",
		});
	}
}
