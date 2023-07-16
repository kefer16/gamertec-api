import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { PedidoDetalleModel } from "../interfaces/pedido_detalle.interface";

export class PedidoDetalle
	extends Model<PedidoDetalleModel>
	implements PedidoDetalleModel
{
	public item!: number;
	public cantidad!: number;
	public precio!: number;
	public total!: number;
	public fecha_registro!: string;
	public activo!: boolean;
	public fk_modelo!: number;
	public fk_pedido_cabecera!: number;
}

PedidoDetalle.init(
	{
		pedido_detalle_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		item: {
			type: DataTypes.INTEGER,
		},
		cantidad: {
			type: DataTypes.INTEGER,
		},
		precio: {
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
		fk_modelo: {
			type: DataTypes.INTEGER,
		},
		fk_pedido_cabecera: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "pedido_detalle",
		timestamps: false,
	}
);
