import { Router } from "express";
import { DepartamentoController } from "../controllers/departamento.controller";

const router = Router();

router.get("/todos", DepartamentoController.listarTodos);
router.get("/uno", DepartamentoController.listarUno);
router.post("/registrar", DepartamentoController.registrar);
router.put("/actualizar", DepartamentoController.actualizar);
router.delete("/eliminar", DepartamentoController.eliminarUno);

export { router as DepartamentoRoutes };
