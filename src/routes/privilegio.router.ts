import { Router } from "express";
import { PrivilegioController } from "../controllers/privilegio.controller";

const router = Router();

router.get("/todos", PrivilegioController.listarTodos);
router.get("/uno", PrivilegioController.listarUno);
router.post("/registrar", PrivilegioController.registrar);
router.put("/actualizar", PrivilegioController.actualizar);

export { router as privilegioRoutes };
