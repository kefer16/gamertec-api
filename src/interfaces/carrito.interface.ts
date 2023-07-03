import { CarritoModel } from "../models/carrito.models";
import { MarcaModel } from "../models/marca.models";
import { ModeloModel } from "../models/modelo.models";

export interface CarritoInterface {
	marca: MarcaModel;
	modelo: ModeloModel;
	carrito: CarritoModel;
}
