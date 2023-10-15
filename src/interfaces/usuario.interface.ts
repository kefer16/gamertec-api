export interface UsuarioSend {
   usuario_id: number;
   nombre: string;
   apellido: string;
   correo: string;
   usuario: string;
   contrasenia: string | null;
   dinero: number;
   foto: string;
   fecha_registro: Date;
   activo: boolean;
   fk_privilegio: number;
   fecha_inicial: Date | null;
   fecha_final: Date | null;
   direccion: string;
   telefono: string;
}

export interface UsuarioLoginSend {
   usuario_id: number;
   nombre: string;
   apellido: string;
   correo: string;
   usuario: string;
   dinero: number;
   foto: string;
   activo: boolean;
   fk_privilegio: number;
   direccion: string;
   telefono: string;
}
export interface UsuarioHistorialSend {
   usuario_id: number;
   nombre: string;
   apellido: string;
   correo: string;
   usuario: string;
   contrasenia: string | null;
   dinero: number;
   foto: string;
   fecha_registro: Date;
   activo: boolean;
   fk_privilegio: number;
   fecha_inicial: Date | null;
   fecha_final: Date | null;
   direccion: string | null;
   telefono: string | null;
}

export interface ActualizaNombreUsuario {
   nombre: string;
}

export interface ActualizaApellidoUsuario {
   apellido: string;
}
export interface ActualizaCorreoUsuario {
   correo: string;
}
export interface ActualizaDireccionUsuario {
   direccion: string;
}

export interface ActualizaFotoUsuario {
   foto: string;
}
