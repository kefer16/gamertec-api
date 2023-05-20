import { Router } from "express";
import { MarcaController } from "../controllers/marca.controller";

const router = Router();

router.get("/todos", MarcaController.listarTodos);
router.get("/uno", MarcaController.listarUno);
router.post("/registrar", MarcaController.registrar);
router.put("/actualizar", MarcaController.actualizar);
router.delete("/eliminar", MarcaController.eliminarUno);

export { router as MarcaRoutes };
