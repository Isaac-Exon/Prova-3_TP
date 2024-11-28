import { Router } from "express";
import { soldadoController } from "../controllers/SoldadoController";

const router = Router();

// Rotas para Soldado
router.post("/", soldadoController.create);
router.get("/", soldadoController.list);
router.delete("/", soldadoController.delete);
router.put("/", soldadoController.update);

export default router;
