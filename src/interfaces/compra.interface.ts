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

export interface ICompraCard {
   compra_cabecera_id: number;
   codigo: string;
   sub_total: number;
   costo_envio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   lst_compra_detalle: ICompraDetalleCard[];
}

export interface ICompraDetalleCard {
   cantidad: number;
   precio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_modelo: IModeloCard[];
}

export interface ICompraDetalleTable {
   cantidad: number;
   precio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_modelo: IModeloCard;
}

export interface IModeloCard {
   foto: string;
   nombre: string;
}

export interface ICompraTable {
   compra_cabecera_id: number;
   codigo: string;
   direccion: string;
   telefono: string;
   sub_total: number;
   costo_envio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_compra_estado: {
      abreviatura: string;
      nombre: string;
   };
   lst_compra_detalle: ICompraDetalleTable[];
}

export interface ICompraDetalleTable {
   compra_detalle_id: number;
   item: number;
   cantidad: number;
   precio: number;
   total: number;
   fecha_registro: Date;
   activo: boolean;
   cls_modelo: IModeloCard;
}

export interface IModeloTable {
   foto: string;
   nombre: string;
}

export interface CompraCabeceraSend {
   compra_cabecera_id: number;
   codigo: string;
   direccion: string;
   telefono: string;
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
   fk_compra_estado: number;
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
