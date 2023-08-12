export interface ComentarioSend {
	comentario_id: number;
	valoracion: number;
	usuario: string;
	titulo: string;
	mensaje: string;
	fecha_registro: Date;
	activo: boolean;
	fk_usuario: number;
	fk_modelo: number;
}
