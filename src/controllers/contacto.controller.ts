import { Request, Response } from "express";
import { prisma } from "../config/conexion";
import { ejecutarOperacion } from "../utils/funciones.utils";
import { ContactoResp } from "../responses/contrato.response";
import { ErrorPersonalizado } from "../entities/errorPersonalizado.entity";

export class ContactoController {
   static async listarTodos(req: Request, res: Response) {
      type tipo = ContactoResp[];

      await ejecutarOperacion<tipo>(req, res, async () => {
         const result: tipo = await prisma.contacto.findMany({
            orderBy: {
               fecha_registro: "desc",
            },
         });
         return result;
      });
   }

   static async listarUno(req: Request, res: Response) {
      type tipo = ContactoResp | null;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const contacto_id = Number(req.query.contacto_id);

         const result: tipo = await prisma.contacto.findUnique({
            where: {
               contacto_id: contacto_id,
            },
         });
         return result;
      });
   }

   static async registrar(req: Request, res: Response) {
      type tipo = ContactoResp;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const { fecha_registro, nombre, correo, mensaje } = req.body;

         if (!nombre) {
            throw new ErrorPersonalizado("Ingrese un nombre");
         }

         if (!correo) {
            throw new ErrorPersonalizado("Ingrese un correo");
         }
         if (!mensaje) {
            throw new ErrorPersonalizado("Ingrese un mensaje");
         }
         const result: tipo = await prisma.contacto.create({
            data: {
               fecha_registro,
               nombre,
               correo,
               mensaje,
            },
         });
         return result;
      });
   }

   static async actualizar(req: Request, res: Response) {
      type tipo = ContactoResp;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const contacto_id = Number(req.query.contacto_id);

         const { fecha_registro, nombre, correo, mensaje } = req.body;

         const result: tipo = await prisma.contacto.update({
            data: {
               fecha_registro,
               nombre,
               correo,
               mensaje,
            },
            where: {
               contacto_id: contacto_id,
            },
         });
         return result;
      });
   }
   static async eliminarUno(req: Request, res: Response) {
      type tipo = ContactoResp;

      await ejecutarOperacion<tipo>(req, res, async () => {
         const contacto_id = Number(req.query.contacto_id);

         const result: tipo = await prisma.contacto.delete({
            where: {
               contacto_id: contacto_id,
            },
         });

         return result;
      });
   }
}
