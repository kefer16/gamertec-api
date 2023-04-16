import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/conexion";
export class UsuarioHistorial extends Model {
	usuario!: string | "";
	contrasenia!: string | "";
}

UsuarioHistorial.init(
	{
		usuario_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
		},
		apellido: {
			type: DataTypes.STRING,
		},
		correo: {
			type: DataTypes.STRING,
		},
		usuario: {
			type: DataTypes.STRING,
			defaultValue: "",
		},
		contrasenia: {
			type: DataTypes.BLOB,
			defaultValue: "",
		},
		dinero: {
			type: DataTypes.DOUBLE,
		},
		foto: {
			type: DataTypes.STRING,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
		fk_privilegio: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		fecha_inicial: {
			type: DataTypes.STRING,
		},
		fecha_final: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "usuario_historial",
		timestamps: false,
	}
);
