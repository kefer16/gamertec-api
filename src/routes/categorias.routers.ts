import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const router = Router();

router.get("/todos", CategoriaController.listarTodos);
router.get("/uno", CategoriaController.listarUno);
router.post("/registrar", CategoriaController.registrar);
router.put("/actualizar", CategoriaController.actualizar);

export { router as categoriaRoutes };
