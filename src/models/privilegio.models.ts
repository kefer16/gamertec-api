import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Privilegio extends Model {
	id!: string;
	tipo!: string;
	activo!: number;
	abreviatura!: string;
}

Privilegio.init(
	{
		id: {
			type: "UNIQUEIDENTIFIER",
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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
		modelName: "Privilegio",
		timestamps: false,
	}
);
