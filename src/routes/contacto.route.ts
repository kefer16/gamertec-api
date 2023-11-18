import { Router } from "express";
import { ContactoController } from "../controllers/contacto.controller";

const router = Router();

router.get("/todos", ContactoController.listarTodos);
router.get("/uno", ContactoController.listarUno);
router.post("/registrar", ContactoController.registrar);
router.put("/actualizar", ContactoController.actualizar);
router.delete("/eliminar", ContactoController.eliminarUno);

export { router as contactoRoutes };
