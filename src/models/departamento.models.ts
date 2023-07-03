import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Departamento extends Model {}

export class DepartamentoModel {
	constructor(public departamento_id: number = 0, public nombre: string = "") {}
}

Departamento.init(
	{
		departamento_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
		},
		costo_envio: {
			type: DataTypes.DOUBLE,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		sequelize,
		modelName: "departamento",
		timestamps: false,
	}
);
