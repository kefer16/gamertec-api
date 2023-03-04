import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/conexion";

class Autenticacion extends Model {
	public token!: string;
	public fecha_registro!: Date;
}

Autenticacion.init(
	{
		token: {
			type: "UNIQUEIDENTIFIER",
			allowNull: false,
		},
		fecha_registro: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Autenticacion",
		timestamps: false,
	}
);
