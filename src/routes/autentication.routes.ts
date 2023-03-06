import { Router } from "express";
import { AutenticacionControlller } from "../middlewares/autentication.middleware";

const router = Router();

router.get("/generar", AutenticacionControlller.generarToken);

export { router as autenticacionRoutes };
