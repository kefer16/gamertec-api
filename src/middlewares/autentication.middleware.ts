import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { Usuario } from "../models/usuario.models";

interface Credenciales {
	usuario?: string;
	contrasenia?: string;
}

export class AutenticacionControlller {
	static async generar_token(req: Request, res: Response) {
		try {
			const datos: any = req.body;

			const credenciales: Credenciales = {
				usuario: datos.usuario ?? "",
				contrasenia: datos.contrasenia ?? "",
			};

			console.log(credenciales);

			const [resultado, metadata] = await sequelize.query(
				"exec sp_generar_token @usuario= ?, @contrasenia= ?",
				{
					replacements: [credenciales.usuario, credenciales.contrasenia],
					type: QueryTypes.SELECT,
				}
			);

			res.status(200).json(resultado);
		} catch (error: any) {
			console.error(error);
			res.status(500).send("Error retrieving data from database");
		}
	}
}
