import { Router } from "express";
import { CompraEstadoController } from "../controllers/compra_estado.controller";


const router = Router();

router.get("/listar_todos", CompraEstadoController.listarTodos);
router.get("/listar_uno", CompraEstadoController.listarUno);

export { router as CompraEstadoRouter };
