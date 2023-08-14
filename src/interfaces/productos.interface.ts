export interface ProductoSend {
	producto_id: number;
	numero_serie: string;
	activo: boolean;
	fecha_registro: Date;
	fk_modelo: number;
	fk_marca: number;
	fk_categoria: number;
}
