import { Router } from "express";
import { CompraController } from "../controllers/compra.controller";

const router = Router();

router.get("/todos", CompraController.listarTodos);
router.get("/uno", CompraController.listarUno);
router.post("/registrar", CompraController.registrar);
router.put("/actualizar", CompraController.actualizar);
router.delete("/eliminar", CompraController.eliminarUno);
router.get("/ultimo", CompraController.listarUltimo);
router.get("/compras_usuario", CompraController.listarComprasUsuario);
router.put(
   "/actualizar_compra_estado",
   CompraController.actualizarCompraEstado
);

export { router as CompraRoutes };
