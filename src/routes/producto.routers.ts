import { Router } from "express";
import { ProductoController } from "../controllers/producto.controller";

const router = Router();

router.get("/todos", ProductoController.listarTodos);
router.get("/uno", ProductoController.listarUno);
router.post("/registrar", ProductoController.registrar);
router.put("/actualizar", ProductoController.actualizar);
router.delete("/eliminar", ProductoController.eliminarUno);
router.get("/series", ProductoController.series);

export { router as ProductoRoutes };
