import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { CompraDetalleModel } from "../interfaces/compra_detalle.interface";

export class CompraDetalle
	extends Model<CompraDetalleModel>
	implements CompraDetalleModel
{
	public item!: number;
	public cantidad!: number;
	public precio!: number;
	public total!: number;
	public fecha_registro!: string;
	public activo!: boolean;
	public fk_modelo!: number;
	public fk_pedido_detalle!: number;
	public fk_compra_cabecera!: number;
}

CompraDetalle.init(
	{
		compra_detalle_id: {
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
		fk_pedido_detalle: {
			type: DataTypes.INTEGER,
		},
		fk_compra_cabecera: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "compra_detalle",
		timestamps: false,
	}
);
