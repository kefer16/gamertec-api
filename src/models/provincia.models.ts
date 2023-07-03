import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Provincia extends Model {}

export class ProvinciaModel {
	constructor(public provincia_id: number = 0, public nombre: string = "") {}
}

Provincia.init(
	{
		provincia_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
		fk_departamento: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "provincia",
		timestamps: false,
	}
);
