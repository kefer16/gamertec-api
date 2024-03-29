export interface ModeloSend {
   modelo_id: number;
   nombre: string;
   descripcion: string;
   foto: string;
   caracteristicas: string;
   color: string;
   precio: number;
   fecha_registro: Date;
   activo: boolean;
   fk_marca: number;
   fk_categoria: number;
}

export interface ModeloPorFiltroSend {
   modelo_id: number;
   nombre: string;
   descripcion: string;
   foto: string;
   caracteristicas: string;
   color: string;
   precio: number;
   cls_marca: { nombre: string; marca_id: number };
}

export interface ModeloDescripcionSend {
   modelo_id: number;
   nombre: string;
   descripcion: string;
   foto: string;
   caracteristicas: string;
   color: string;
   precio: number;
   cls_marca: {
      nombre: string;
      marca_id: number;
      cls_categoria: {
         categoria_id: number;
         nombre: string;
      };
   };
   _count: {
      lst_producto: number;
   };
}
