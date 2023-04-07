import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/conexion";

export class ApiEnvioModel extends Model {}

ApiEnvioModel.init(
	{
		api_envio_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		codigo_envio: {
			type: "UNIQUEIDENTIFIER",
			allowNull: false,
		},
		tipo_peticion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		parametros: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		llave: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cabeceras: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tipo_contenido: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cuerpo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		respuesta: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		agente: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fecha_creacion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fk_usuario: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		estatus: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "api_envio",
		timestamps: false,
	}
);
