import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import {
   CompraCabeceraSend,
   CompraDetalleSend,
   CompraUsuarioSend,
   ICompraCard,
   ICompraTable,
} from "../interfaces/compra.interface";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { TableSQLJson } from "../interfaces/json.interface";

export class CompraController {
   static async listarTodos(req: Request, res: Response) {
      type tipo = ICompraCard[] | null;
      await ejecutarOperacion<tipo>(req, res, async () => {
         const usuario_id: number = Number(req.query.usuario_id);

         const result_query: TableSQLJson[] =
            await prisma.$queryRaw`exec sp_listar_compra_por_usuario @usuario_id = ${usuario_id}`;

         let result = null;
         if (result_query) {
            result = JSON.parse(result_query[0].json);
         }
         return result;
      });
   }

   static async listarUno(req: Request, res: Response) {
      type tipo = ICompraTable | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: number = Number(req.query.compra_cabecera_id);

         const result: tipo = await prisma.compra_cabecera.findUnique({
            select: {
               compra_cabecera_id: true,
               codigo: true,
               direccion: true,
               telefono: true,
               sub_total: true,
               costo_envio: true,
               total: true,
               fecha_registro: true,
               activo: true,
               cls_compra_estado: {
                  select: {
                     abreviatura: true,
                     nombre: true,
                  },
               },
               lst_compra_detalle: {
                  select: {
                     compra_detalle_id: true,
                     item: true,
                     cantidad: true,
                     precio: true,
                     total: true,
                     fecha_registro: true,
                     activo: true,
                     cls_modelo: {
                        select: {
                           foto: true,
                           nombre: true,
                        },
                     },
                  },
               },
            },
            where: {
               compra_cabecera_id: ID,
            },
         });
         return result;
      });
   }

   static async listarUltimo(req: Request, res: Response) {
      type tipo = CompraCabeceraSend | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.compra_cabecera.findFirst({
            orderBy: {
               fk_pedido_cabecera: "desc",
            },
         });
         return result;
      });
   }

   static async registrar(req: Request, res: Response) {
      type tipo = number[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const preferencia_id = String(req.body.preferencia_id);
         const estado = String(req.body.estado);
         const pago_id = String(req.body.pago_id);
         const usuario_id = Number(req.body.usuario_id);

         const result = prisma.$executeRaw`exec sp_registrar_compra @preferencia_id = ${preferencia_id}, @estado = ${estado}, @pago_id = ${pago_id}, @usuario_id = ${usuario_id}`;

         const result1 = await prisma.$transaction([result]);

         return result1;
      });
   }

   static async actualizar(req: Request, res: Response) {
      type tipo = boolean;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: number = Number(req.query.compra_cabecera_id);

         await prisma.$transaction(async (prisma) => {
            const compra_cabecera: CompraCabeceraSend =
               req.body.compra_cabecera;

            const result_cabecera = await prisma.compra_cabecera.update({
               data: compra_cabecera,
               where: {
                  compra_cabecera_id: ID,
               },
            });
            const compra_detalle: CompraDetalleSend[] =
               req.body.compra_cabecera;

            const result_detalle = await prisma.compra_detalle.updateMany({
               data: compra_detalle,
               where: { fk_compra_cabecera: ID },
            });
            return { result_cabecera, result_detalle };
         });
         return true;
      });
   }

   static async eliminarUno(req: Request, res: Response) {
      type tipo = CompraCabeceraSend;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const ID: number = Number(req.query.compra_cabecera_id);

         const result: tipo = await prisma.compra_cabecera.delete({
            where: {
               compra_cabecera_id: ID,
            },
         });
         return result;
      });
   }

   static async listarComprasUsuario(req: Request, res: Response) {
      type tipo = CompraUsuarioSend[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const usuario_id: number = Number(req.query.usuario_id);

         const result: tipo = await prisma.compra_cabecera.findMany({
            select: {
               compra_cabecera_id: true,
               codigo: true,
               sub_total: true,
               costo_envio: true,
               total: true,
               fecha_registro: true,
               activo: true,
               fk_compra_estado: true,
               lst_compra_detalle: {
                  select: {
                     compra_detalle_id: true,
                     item: true,
                     cantidad: true,
                     precio: true,
                     total: true,
                     fecha_registro: true,
                     activo: true,
                  },
               },
            },
            where: {
               fk_usuario: usuario_id,
               activo: true,
            },
         });
         return result;
      });
   }

   static async actualizarCompraEstado(req: Request, res: Response) {
      type tipo = number[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const compra_cabecera_id = Number(req.query.compra_cabecera_id);
         const compra_abreviatura = String(req.query.compra_abreviatura);

         const result = prisma.$executeRaw`exec sp_actualizar_compra_estado @compra_cabecera_id = ${compra_cabecera_id}, @compra_abreviatura = ${compra_abreviatura}`;

         const result1 = await prisma.$transaction([result]);

         return result1;
      });
   }
}
