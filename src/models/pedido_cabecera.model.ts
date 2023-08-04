import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { PedidoCabeceraModel } from "../interfaces/pedido_cabecera.interface";
import { PedidoDetalle } from "./pedido_detalle.model";

export class PedidoCabecera
	extends Model<PedidoCabeceraModel>
	implements PedidoCabeceraModel
{
	public codigo!: string;
	public direccion!: string;
	public telefono!: string;
	public sub_total!: number;
	public costo_envio!: number;
	public total!: number;
	public fecha_registro!: string;
	public activo!: boolean;
	public fk_distrito!: number;
	public fk_usuario!: number;
}

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

PedidoCabecera.hasMany(PedidoDetalle, {
	foreignKey: "fk_pedido_cabecera",
	as: "array_pedido_detalle",
});

PedidoDetalle.belongsTo(PedidoCabecera, {
	foreignKey: "fk_pedido_cabecera",
});
