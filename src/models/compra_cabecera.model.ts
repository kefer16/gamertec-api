import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
import { CompraCabeceraModel } from "../interfaces/compra_cabecera.interface";

export class CompraCabecera
	extends Model<CompraCabeceraModel>
	implements CompraCabeceraModel
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
	public fk_pedido_cabecera!: number;
	public fk_usuario!: number;
}

CompraCabecera.init(
	{
		compra_cabecera_id: {
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
		fk_pedido_cabecera: {
			type: DataTypes.INTEGER,
		},
		fk_usuario: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		modelName: "compra_cabecera",
		timestamps: false,
	}
);
