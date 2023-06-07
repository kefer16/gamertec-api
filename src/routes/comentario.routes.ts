import { Router } from "express";
import { ComentarioController } from "../controllers/comentario.controller";

const router = Router();

router.get("/todos", ComentarioController.listarTodos);
router.get("/uno", ComentarioController.listarUno);
router.post("/registrar", ComentarioController.registrar);
router.put("/actualizar", ComentarioController.actualizar);
router.delete("/eliminar", ComentarioController.eliminarUno);
router.get("/buscar_por_modelo", ComentarioController.buscarPorModelo);

export { router as comentarioRoutes };
