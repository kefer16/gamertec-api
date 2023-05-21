import { Router } from "express";
import { ModeloController } from "../controllers/modelo.controller";

const router = Router();

router.get("/todos", ModeloController.listarTodos);
router.get("/uno", ModeloController.listarUno);
router.post("/registrar", ModeloController.registrar);
router.put("/actualizar", ModeloController.actualizar);
router.delete("/eliminar", ModeloController.eliminarUno);

export { router as ModeloRoutes };
