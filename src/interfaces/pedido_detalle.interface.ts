export interface PedidoDetalleModel {
	pedido_detalle_id?: number;
	item: number;
	cantidad: number;
	precio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	comprado: boolean;
	fk_modelo: number;
	fk_pedido_cabecera: number;
}

export interface PedidoDetalleSinIdModel {
	item: number;
	cantidad: number;
	precio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	comprado: boolean;
	fk_modelo: number;
	fk_pedido_cabecera: number;
}

export interface IPedidoDetalle {
	item: number;
	cantidad: number;
	precio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	comprado: boolean;
	fk_modelo: number;
	fk_pedido_cabecera: number;
}
