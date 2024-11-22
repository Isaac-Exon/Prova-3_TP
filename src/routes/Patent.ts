import { Router } from "express";
import { patenteController } from "../controllers/PatenteController";

const router = Router();

// Rotas para Patente
router.post("/", patenteController.create); // Criar Patente
router.get("/", patenteController.list); // Listar Patentes
router.delete("/", patenteController.delete); // Deletar Patente
router.put("/", patenteController.update); // Atualizar Patente

export default router;
