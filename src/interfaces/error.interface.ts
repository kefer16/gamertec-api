export interface ErrorProps {
    codigo : string;
    linea : number;
    objeto: string;
    mensaje : string;
    servidor: string;
    fecha_registro: string;
    fk_usuario: number;
}