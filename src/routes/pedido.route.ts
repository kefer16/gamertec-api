import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controlller";

const router = Router();

router.get("/todos", PedidoController.listarTodos);
router.get("/uno", PedidoController.listarUno);
router.post("/registrar", PedidoController.registrar);
router.put("/actualizar", PedidoController.actualizar);
router.delete("/eliminar", PedidoController.eliminarUno);

export { router as PedidoRoutes };
