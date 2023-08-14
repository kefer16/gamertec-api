export interface CompraSend {
	compra_cabecera_id: number;
	codigo: string;
	direccion: string;
	telefono: number;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	lst_compra_detalle: {
		compra_detalle_id: number;
		item: number;
		cantidad: number;
		precio: number;
		total: number;
		serie: string;
		fecha_registro: Date;
		activo: boolean;
	}[];
}

export interface CompraCabeceraSend {
	compra_cabecera_id: number;
	codigo: string;
	direccion: string;
	telefono: number;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	fk_distrito: number;
	fk_pedido_cabecera: number;
	fk_usuario: number;
}

export interface CompraDetalleSend {
	compra_detalle_id: number;
	item: number;
	cantidad: number;
	precio: number;
	total: number;
	serie: string;
	fecha_registro: string;
	activo: boolean;
	fk_modelo: number;
	fk_pedido_detalle: number;
	fk_compra_cabecera: number;
}

export interface CompraUsuarioSend {
	compra_cabecera_id: number;
	codigo: string;
	sub_total: number;
	costo_envio: number;
	total: number;
	fecha_registro: Date;
	activo: boolean;
	lst_compra_detalle: {
		compra_detalle_id: number;
		item: number;
		cantidad: number;
		precio: number;
		total: number;
		fecha_registro: Date;
		activo: boolean;
	}[];
}
