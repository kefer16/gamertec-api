import { MarcaModel } from "../models/marca.models";
import { ModeloModel } from "../models/modelo.models";

export interface modeloFiltroInterface {
	modelo: ModeloModel;
	marca: MarcaModel;
}

export interface PorductoSend {
	producto_id: number;
	numero_serie: string;
	activo: boolean;
	fecha_registro: Date;
	fk_modelo: number;
	fk_marca: number;
	fk_categoria: number;
}
