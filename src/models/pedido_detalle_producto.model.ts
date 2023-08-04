import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { PedidoDetalleProductoModel } from "../interfaces/pedido_detalle_producto.interface";
import { PedidoDetalle } from "./pedido_detalle.model";

export class PedidoDetalleProducto
	extends Model<PedidoDetalleProductoModel>
	implements PedidoDetalleProductoModel
{
	public item!: number;
	public numero_serie!: string;
	public fecha_registro!: string;
	public fk_producto!: number;
	public fk_pedido_detalle!: number;
}

PedidoDetalleProducto.init(
	{
		pedido_detalle_producto_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		item: {
			type: DataTypes.INTEGER,
		},
		numero_serie: {
			type: DataTypes.STRING,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		fk_producto: {
			type: DataTypes.INTEGER,
		},
		fk_pedido_detalle: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "pedido_detalle_producto",
		timestamps: false,
	}
);

PedidoDetalleProducto.hasOne(PedidoDetalle, {
	foreignKey: "pedido_detalle_producto_id",
	sourceKey: "fk_pedido_detalle",
});

PedidoDetalle.belongsTo(PedidoDetalleProducto, {
	foreignKey: "pedido_detalle_producto_id",
	targetKey: "fk_pedido_detalle",
});
