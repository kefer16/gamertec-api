import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";

export class Producto extends Model {}

Producto.init(
	{
		producto_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		numero_serie: {
			type: DataTypes.STRING,
		},
		fk_modelo: {
			type: DataTypes.NUMBER,
		},
		fk_marca: {
			type: DataTypes.NUMBER,
		},
		fk_categoria: {
			type: DataTypes.NUMBER,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		sequelize,
		modelName: "producto",
		timestamps: false,
	}
);
