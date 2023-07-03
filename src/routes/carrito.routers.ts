import { Router } from "express";
import { CarritoController } from "../controllers/carrito.controller";

const router = Router();

router.get("/todos", CarritoController.listarTodos);
router.get("/uno", CarritoController.listarUno);
router.post("/registrar", CarritoController.registrar);
router.put("/actualizar", CarritoController.actualizar);
router.delete("/eliminar", CarritoController.eliminarUno);
router.get(
	"/obtener_carrito_por_usuario",
	CarritoController.obtenerCarritoPorUsuario
);

export { router as carritoRoutes };
