import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Privilegio extends Model {}

Privilegio.init(
	{
		privilegio_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		tipo: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.NUMBER,
		},
		abreviatura: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "privilegio",
		timestamps: false,
	}
);
