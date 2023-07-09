export interface PedidoCabeceraModel {
	pedido_cabecera_id: number;
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
