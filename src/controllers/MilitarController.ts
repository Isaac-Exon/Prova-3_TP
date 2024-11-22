import { Request, Response } from "express";
import { Militar } from "../models";

class MilitarController {
  // Criar Militar
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, idade, email, fone } = req.body;
    try {
      const militar = new Militar({ nome, idade, email, fone });
      const savedMilitar = await militar.save();
      return res.json(savedMilitar);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Listar todos os Militares
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const militares = await Militar.find().sort({ nome: "asc" });
      return res.json(militares);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Deletar Militar
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const militar = await Militar.findByIdAndDelete(id);
      if (militar) {
        return res.json({ message: "Militar deletado com sucesso!" });
      }
      return res.status(404).json({ message: "Militar não encontrado!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualizar Militar
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, nome, idade, email, fone } = req.body;
    try {
      const militar = await Militar.findById(id);
      if (!militar) {
        return res.status(404).json({ message: "Militar não encontrado!" });
      }
      militar.nome = nome;
      militar.idade = idade;
      militar.email = email;
      militar.fone = fone;
      const updatedMilitar = await militar.save();
      return res.json(updatedMilitar);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export const militarController = new MilitarController();
