import { Router } from "express";
import { ProvinciaController } from "../controllers/provincia.controller";

const router = Router();

router.get("/todos", ProvinciaController.listarTodos);
router.get("/uno", ProvinciaController.listarUno);
router.post("/registrar", ProvinciaController.registrar);
router.put("/actualizar", ProvinciaController.actualizar);
router.delete("/eliminar", ProvinciaController.eliminarUno);

export { router as ProvinciaRoutes };
