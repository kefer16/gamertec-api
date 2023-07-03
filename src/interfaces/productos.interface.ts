import { MarcaModel } from "../models/marca.models";
import { ModeloModel } from "../models/modelo.models";

export interface modeloFiltroInterface {
	modelo: ModeloModel;
	marca: MarcaModel;
}
