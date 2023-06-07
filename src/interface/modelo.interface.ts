import { CategoriaModel } from "../models/categoria.models";
import { MarcaModel } from "../models/marca.models";
import { ModeloModel } from "../models/modelo.models";

export interface modeloDescripcionProps {
	categoria: CategoriaModel;
	marca: MarcaModel;
	modelo: ModeloModel;
}
