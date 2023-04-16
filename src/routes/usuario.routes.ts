import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

router.get("/todos", UsuarioController.listarTodos);
router.get("/uno", UsuarioController.listarUno);
router.post("/registrar", UsuarioController.registrar);
router.put("/actualizar", UsuarioController.actualizar);
router.post("/login", UsuarioController.login);
router.get("/historial", UsuarioController.historial);

export { router as usuarioRoutes };
