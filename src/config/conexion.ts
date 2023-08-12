import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { PrismaClient } from "@prisma/client";

export const sequelize = new Sequelize({
	dialect: "mssql",
	host: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT),
	dialectOptions: {
		options: {
			encrypt: true,
		},
	},
	define: {
		freezeTableName: true,
		timestamps: false,
	},
});

export const prisma = new PrismaClient({ log: ["query", "info", "warn"] });
