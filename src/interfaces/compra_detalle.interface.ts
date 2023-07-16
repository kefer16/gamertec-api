export interface CompraDetalleModel {
	compra_detalle_id?: number;
	item: number;
	cantidad: number;
	precio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	fk_modelo: number;
	fk_pedido_detalle: number;
	fk_compra_cabecera: number;
}
