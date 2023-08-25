export interface PedidoCabeceraModel {
	pedido_cabecera_id?: number;
	codigo: string;
	direccion: string;
	telefono: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: string;
	activo: boolean;
	fk_distrito: number;
	fk_usuario: number;
}

export interface IPedidoCabecera {
	pedido_cabecera_id?: number;
	codigo: string;
	direccion: string;
	telefono: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	fk_distrito: number;
	fk_usuario: number;
}

export interface PedidoCabeceraListarUnoSend {
	pedido_cabecera_id: number;
	codigo: string;
	direccion: string;
	telefono: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	lst_pedido_detalle: {
		pedido_detalle_id: number;
		item: number;
		cantidad: number;
		precio: number;
		total: number;
		fecha_registro: Date;
		activo: boolean;
		cls_modelo: {
			modelo_id: number;
			nombre: string;
			descripcion: string;
			foto: string;
		};
	}[];
}

export interface PedidoCabeceraUsuarioSend {
	pedido_cabecera_id: number;
	codigo: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	lst_pedido_detalle: {
		pedido_detalle_id: number;
		item: number;
		cantidad: number;
		precio: number;
		total: number;
		fecha_registro: Date;
		activo: boolean;
		cls_modelo: {
			modelo_id: number;
			nombre: string;
			descripcion: string;
			foto: string;
		};
	}[];
}

export interface IPedidoCarrito {
	cantidad: number;
	fk_modelo: number;
	carrito_id: number;
	precio_total: number;
}

export interface IPedidoUsuario {
	direccion: string;
	telefono: string;
}

export interface IPedidoDetalleProducto {
	pedido_detalle_producto_id: number;
	item: number;
	numero_serie: string;
	fecha_registro: Date;
	fk_producto: number;
	fk_pedido_detalle: number;
}

export interface IActualizaSerie {
	numero_serie: string;
	fk_producto: number;
}

export interface IPedidoDetalleProductoId {
	pedido_detalle_producto_id: number;
}
