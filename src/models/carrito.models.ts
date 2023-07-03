import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Carrito extends Model {}

export class CarritoModel {
	constructor(
		public carrito_id: number = 0,
		public cantidad: number = 0,
		public fecha_registro: string = "",
		public activo: boolean = false
	) {}
}

Carrito.init(
	{
		carrito_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		cantidad: {
			type: DataTypes.NUMBER,
		},
		precio_total: {
			type: DataTypes.DOUBLE,
		},
		despues: {
			type: DataTypes.NUMBER,
		},
		comprado: {
			type: DataTypes.NUMBER,
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
		modelName: "carrito",
		timestamps: false,
	}
);
