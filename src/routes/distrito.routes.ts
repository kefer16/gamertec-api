import { Router } from "express";
import { DistritoController } from "../controllers/distrito.controller";

const router = Router();

router.get("/todos", DistritoController.listarTodos);
router.get("/uno", DistritoController.listarUno);
router.post("/registrar", DistritoController.registrar);
router.put("/actualizar", DistritoController.actualizar);
router.delete("/eliminar", DistritoController.eliminarUno);

export { router as DistritoRoutes };
