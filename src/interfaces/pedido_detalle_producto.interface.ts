export interface PedidoDetalleProductoModel {
	pedido_detalle_producto_id?: number;
	item: number;
	numero_serie: string;
	fecha_registro: string;
	fk_producto: number;
	fk_pedido_detalle: number;
}

export interface PedidoDetalleProductoSinIdModel {
	item: number;
	numero_serie: string;
	fecha_registro: string;
	fk_producto: number;
	fk_pedido_detalle: number;
}
