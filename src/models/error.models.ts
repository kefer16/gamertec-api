import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/conexion";

class Error extends Model {}

Error.init(
	{
		id: {
			type: "UNIQUEIDENTIFIER",
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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
		modelName: "Error",
		timestamps: false,
	}
);

export { Error as ErrorModel };
