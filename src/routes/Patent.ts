import { Router } from "express";
import { patenteController } from "../controllers/PatenteController";

const router = Router();

// Rotas para Patente
router.post("/", patenteController.create);
router.get("/", patenteController.list);
router.delete("/", patenteController.delete);
router.put("/", patenteController.update);

export default router;
