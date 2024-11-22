import { Router } from "express";
import { militarController } from "../controllers/MilitarController";

const router = Router();

// Rotas para Militar
router.post("/", militarController.create); // Criar Militar
router.get("/", militarController.list); // Listar Militares
router.delete("/", militarController.delete); // Deletar Militar
router.put("/", militarController.update); // Atualizar Militar

export default router;
