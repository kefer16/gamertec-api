import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Categoria extends Model {}

Categoria.init(
	{
		categoria_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.NUMBER,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		fecha_actualizacion: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "categoria",
		timestamps: false,
	}
);
