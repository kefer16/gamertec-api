export interface DistritoSend {
	distrito_id: number;
	nombre: string;
	activo: boolean;
	costo_envio: number;
	fk_provincia: number;
	fk_departamento: number;
}
