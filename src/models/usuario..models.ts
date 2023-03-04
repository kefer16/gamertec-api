import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../sequelize";

export class Usuario extends Model {}

Usuario.init(
	{
		id: {
			type: "UNIQUEIDENTIFIER",
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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
		},
		contrasenia: {
			type: DataTypes.STRING,
		},
		dinero: {
			type: DataTypes.DOUBLE,
		},
		fecha_registro: {
			type: DataTypes.DATE,
		},
		activo: {
			type: DataTypes.BOOLEAN,
		},
		fk_privilegio: {
			type: DataTypes.STRING,
		},
		fecha_inicial: {
			type: DataTypes.DATE,
		},
		fecha_final: {
			type: DataTypes.DATE,
		},
	},
	{
		sequelize,
		modelName: "Usuario",
		timestamps: false,
	}
);
