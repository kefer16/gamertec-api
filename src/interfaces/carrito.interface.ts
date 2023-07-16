import { MarcaModel } from "../models/marca.models";
import { ModeloModel } from "../models/modelo.models";

export interface CarritoInterface {
	marca: MarcaModel;
	modelo: ModeloModel;
	carrito: CarritoModel;
}

export interface CarritoModel {
	carrito_id?: number;
	cantidad?: number;
	precio_total?: number;
	despues?: boolean;
	pedido?: boolean;
	fecha_registro?: string;
	activo?: boolean;
	fk_usuario?: number;
	fk_modelo?: number;
}
