import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Distrito extends Model {}

export class DistritoModel {
	constructor(public distrito_id: number = 0, public nombre: string = "") {}
}

Distrito.init(
	{
		distrito_id: {
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
		fk_provincia: {
			type: DataTypes.INTEGER,
		},
		fk_departamento: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "distrito",
		timestamps: false,
	}
);
