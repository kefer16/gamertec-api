import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Comentario extends Model {}

Comentario.init(
	{
		comentario_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		valoracion: {
			type: DataTypes.NUMBER,
		},
		usuario: {
			type: DataTypes.NUMBER,
		},
		titulo: {
			type: DataTypes.STRING,
		},
		mensaje: {
			type: DataTypes.STRING,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
		fk_usuario: {
			type: DataTypes.INTEGER,
		},
		fk_modelo: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "comentario",
		timestamps: false,
	}
);
