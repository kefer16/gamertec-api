import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

router.get("/todos", UsuarioController.listarTodos);
router.get("/uno", UsuarioController.listarUno);
router.post("/registrar", UsuarioController.registrar);
router.put("/actualizar", UsuarioController.actualizar);
router.get("/login", UsuarioController.login);

export { router as usuarioRoutes };
