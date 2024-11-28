import { Request, Response } from "express";
import { Soldado } from "../models";

class SoldadoController {
  // Criar Soldado
  public async create(req: Request, res: Response): Promise<Response> {
    const { cim, altura, militar } = req.body;
    try {
      const soldado = new Soldado({ cim, altura, militar });
      const savedSoldado = await soldado.save();
      return res.json(savedSoldado);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Listar todos os Soldados
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const soldados = await Soldado.find()
        .populate("militar")
        .sort({ cim: "asc" });
      return res.json(soldados);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Deletar Soldado
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const soldado = await Soldado.findByIdAndDelete(id);
      if (soldado) {
        return res.json({ message: "Soldado deletado com sucesso!" });
      }
      return res.status(404).json({ message: "Soldado não encontrado!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualizar Soldado
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, cim, altura, militar } = req.body;
    try {
      const soldado = await Soldado.findById(id);
      if (!soldado) {
        return res.status(404).json({ message: "Soldado não encontrado!" });
      }
      soldado.cim = cim;
      soldado.altura = altura;
      soldado.militar = militar;
      const updatedSoldado = await soldado.save();
      return res.json(updatedSoldado);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export const soldadoController = new SoldadoController();
