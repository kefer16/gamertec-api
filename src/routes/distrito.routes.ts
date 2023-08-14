import { Router } from "express";
import { DistritoController } from "../controllers/distrito.controller";
import { distritoValidacion } from "../middlewares/distrito.middleware";

const router = Router();

router.get("/todos", DistritoController.listarTodos);
router.get("/uno", distritoValidacion, DistritoController.listarUno);
router.post("/registrar", DistritoController.registrar);
router.put("/actualizar", DistritoController.actualizar);
router.delete("/eliminar", DistritoController.eliminarUno);

export { router as DistritoRoutes };
