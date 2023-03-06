import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

router.get("/all", UsuarioController.listar_todos);
router.post("/register", UsuarioController.register);
router.post("/login", UsuarioController.login);

export { router as usuarioRoutes };
