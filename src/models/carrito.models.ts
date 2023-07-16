import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { CarritoModel } from "../interfaces/carrito.interface";

export class Carrito extends Model<CarritoModel> implements CarritoModel {
	public cantidad!: number;
	public precio_total!: number;
	public despues!: boolean;
	public pedido!: boolean;
	public fecha_registro!: string;
	public activo!: boolean;
	public fk_usuario!: number;
	public fk_modelo!: number;
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
			type: DataTypes.BOOLEAN,
		},
		pedido: {
			type: DataTypes.BOOLEAN,
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
