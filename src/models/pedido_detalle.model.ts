import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { PedidoDetalleModel } from "../interfaces/pedido_detalle.interface";

export class PedidoDetalle extends Model<PedidoDetalleModel> {}

PedidoDetalle.init(
	{
		pedido_detalle_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		cantidad: {
			type: DataTypes.STRING,
		},
		precio: {
			type: DataTypes.STRING,
		},
		total: {
			type: DataTypes.STRING,
		},
		fecha_registro: {
			type: DataTypes.DOUBLE,
		},
		activo: {
			type: DataTypes.DOUBLE,
		},
		fk_modelo: {
			type: DataTypes.DOUBLE,
		},
		fk_pedido_cabecera: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "pedido_detalle",
		timestamps: false,
	}
);
