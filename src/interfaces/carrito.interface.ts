export interface CarritoModel {
   carrito_id?: number;
   cantidad?: number;
   precio_total?: number;
   despues?: boolean;
   pedido?: boolean;
   fecha_registro?: string;
   activo?: boolean;
   fk_usuario?: number;
   fk_modelo?: number;
}

export interface CarritoSend {
   carrito_id: number;
   cantidad: number;
   precio_total: number;
   despues: boolean;
   pedido: boolean;
   fecha_registro: Date;
   activo: boolean;
   fk_usuario: number;
   fk_modelo: number;
}

export interface CarritoUsuarioSend {
   carrito_id: number;
   cantidad: number;
   fecha_registro: Date;
   activo: boolean;
   cls_modelo: {
      modelo_id: number;
      nombre: string;
      descripcion: string;
      foto: string;
      caracteristicas: string;
      color: string;
      precio: number;
      cls_marca: {
         marca_id: number;
         nombre: string;
      };
      _count: {
         lst_producto: number;
      };
   };
}
export interface CarritoCantidadUsuario {
   cantidad: number;
}
