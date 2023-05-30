import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Marca extends Model {}

export class MarcaModel {
	constructor(public marca_id: number = 0, public nombre: string = "") {}
}

Marca.init(
	{
		marca_id: {
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
		fk_categoria: {
			type: DataTypes.STRING,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "marca",
		timestamps: false,
	}
);
