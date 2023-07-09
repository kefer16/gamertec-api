import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { PedidoCabeceraModel } from "../interfaces/pedido_cabecera.interface";

export class PedidoCabecera extends Model<PedidoCabeceraModel> {}

PedidoCabecera.init(
	{
		pedido_cabecera_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		codigo: {
			type: DataTypes.STRING,
		},
		direccion: {
			type: DataTypes.STRING,
		},
		telefono: {
			type: DataTypes.STRING,
		},
		sub_total: {
			type: DataTypes.DOUBLE,
		},
		costo_envio: {
			type: DataTypes.DOUBLE,
		},
		total: {
			type: DataTypes.DOUBLE,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
		fk_distrito: {
			type: DataTypes.INTEGER,
		},
		fk_usuario: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "pedido_cabecera",
		timestamps: false,
	}
);
