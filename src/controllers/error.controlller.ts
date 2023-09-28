import { Response } from "express";
import { RespuestaEntity } from "../entities/respuesta.entity";
import { RespuestaTokenEntity } from "../entities/respuestacredenciales.entity";
// import { ErrorModel } from "../models/error.models";
import {
	obtenerArchivoError,
	obtenerFechaLocal,
} from "../utils/funciones.utils";
import { prisma } from "../config/conexion";
import { Prisma } from "@prisma/client";
import { ErrorProps } from "../interfaces/error.interface";

export class ErrorController {
	static async grabarError(codigo: number, error: any, res: Response) {
		const errorProps: ErrorProps = {
			codigo : "",
			linea : 0,
			objeto: "",
			mensaje : "",
			servidor: "",
			fecha_registro: obtenerFechaLocal(),
			fk_usuario: 1,
		}

		if (error) { 
			errorProps.objeto = obtenerArchivoError(error);  
			errorProps.mensaje = error.message; 
			errorProps.servidor = "CODE" 	
		}

		if (error.parent){
			errorProps.linea = error.parent.lineNumber;  
			errorProps.servidor = error.parent.serverName; 
		}

		if (error instanceof Prisma.PrismaClientKnownRequestError) {			
			errorProps.codigo = String(error.meta?.code);
			errorProps.mensaje =  String(error.meta?.message);
			errorProps.servidor = "DATABASE" 
		} 
		
		errorProps.codigo = errorProps.codigo === undefined ? "0" : errorProps.codigo;  
		errorProps.linea = errorProps.linea === undefined ? 0 : errorProps.linea;  
		errorProps.objeto = errorProps.objeto === undefined ? "" : errorProps.objeto;  
		errorProps.mensaje = errorProps.mensaje === undefined ? "" : errorProps.mensaje;  
		errorProps.servidor = errorProps.servidor === undefined ? "" : errorProps.servidor;  

		const respuestaJson: RespuestaEntity<null> = {
			code: codigo,
			data: null,
			error: {
				code: errorProps.codigo,
				message: errorProps.mensaje
			}
		};

		try {
			await prisma.error.create({
				data: {
					codigo: errorProps.codigo,
					linea: errorProps.linea,
					objeto: errorProps.objeto,
					mensaje: errorProps.mensaje,
					servidor: errorProps.servidor ,
					fecha_registro: errorProps.fecha_registro,
					fk_usuario: errorProps.fk_usuario,
				},
			});

			res.status(codigo).json(respuestaJson);
		} catch (error) {
			console.log(error);
		}
	}

	static async grabarSoloError(error: any) {
		try {
			await prisma.error.create({
				data: {
					codigo: error.parent === undefined ? 0 : error.parent.number,
					linea: error.parent.lineNumber,
					objeto: obtenerArchivoError(error),
					mensaje: error.message,
					servidor: error.parent.serverName,
					fecha_registro: obtenerFechaLocal(),
					fk_usuario: 1,
				},
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
				code: "0",
				message: _error.message,
			},
		};

		try {
			await prisma.error.create({
				data: {
					codigo: "0",
					linea: _error.parent.lineNumber,
					objeto: _error.parent.procName,
					mensaje: _error.message,
					servidor: _error.parent.serverName,
					fecha_registro: obtenerFechaLocal(),
					fk_usuario: 1,
				},
			});

			res.status(codigo).json(respuestaJson);
		} catch (error) {
			console.log(error);
		}
	}
}
