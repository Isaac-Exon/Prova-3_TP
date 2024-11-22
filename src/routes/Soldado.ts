import { Router } from "express";
import { soldadoController } from "../controllers/SoldadoControler";

const router = Router();

// Rotas para Soldado
router.post("/", soldadoController.create); // Criar Soldado
router.get("/", soldadoController.list); // Listar Soldados
router.delete("/", soldadoController.delete); // Deletar Soldado
router.put("/", soldadoController.update); // Atualizar Soldado

export default router;
