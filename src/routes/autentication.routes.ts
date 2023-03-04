import { Router } from "express";
import { AutenticacionControlller } from "../middlewares/autentication.middleware";

const router = Router();

router.get("/generar", AutenticacionControlller.generar_token);

export { router as autenticacionRoutes };
