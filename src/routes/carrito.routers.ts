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
router.get("/obtener_cantidad_carrito", CarritoController.obtenerCantidadCarrito);

export { router as carritoRoutes };
