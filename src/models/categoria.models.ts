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
	},
	{
		sequelize,
		modelName: "categoria",
		timestamps: false,
	}
);
