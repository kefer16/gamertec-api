export interface PedidoDetalleModel {
	pedido_detalle_id: number;
	cantidad: number;
	precio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	fk_modelo: number;
	fk_pedido_cabecera: number;
}
