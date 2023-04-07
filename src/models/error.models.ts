import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/conexion";

class Error extends Model {}

Error.init(
	{
		error_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		codigo: {
			type: DataTypes.INTEGER,
		},
		linea: {
			type: DataTypes.INTEGER,
		},
		objeto: {
			type: DataTypes.STRING,
		},
		mensaje: {
			type: DataTypes.STRING,
		},
		servidor: {
			type: DataTypes.STRING,
		},
		fecha_registro: {
			type: DataTypes.STRING,
		},
		fk_usuario: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "error",
		timestamps: false,
	}
);

export { Error as ErrorModel };
