import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Modelo extends Model {}

export class ModeloModel {
	constructor(
		public modelo_id: number = 0,
		public descripcion: string = "",
		public precio: number = 0,
		public foto: string = ""
	) {}
}

Modelo.init(
	{
		modelo_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
		},
		descripcion: {
			type: DataTypes.STRING,
		},
		foto: {
			type: DataTypes.STRING,
		},
		caracteristicas: {
			type: DataTypes.STRING,
		},
		color: {
			type: DataTypes.STRING,
		},
		precio: {
			type: DataTypes.DOUBLE,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		stock: {
			type: DataTypes.DOUBLE,
		},
		numero_series: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
		fk_marca: {
			type: DataTypes.INTEGER,
		},
		fk_categoria: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "modelo",
		timestamps: false,
	}
);
