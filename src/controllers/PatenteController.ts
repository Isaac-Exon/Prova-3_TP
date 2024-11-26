import { Request, Response } from "express";
import Patente from "../models/patente";

class PatenteController {
  // Criar Patente
  public async create(req: Request, res: Response): Promise<Response> {
    const { codigo, descricao } = req.body;
    try {
      const patente = new Patente({ codigo, descricao });
      const savedPatente = await patente.save();
      return res.json(savedPatente);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Listar todas as Patentes
  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const patentes = await Patente.find().sort({ codigo: "asc" });
      return res.json(patentes);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Deletar Patente
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const patente = await Patente.findByIdAndDelete(id);
      if (patente) {
        return res.json({ message: "Patente deletada com sucesso!" });
      }
      return res.status(404).json({ message: "Patente não encontrada!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualizar Patente
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, codigo, descricao } = req.body;
    try {
      const patente = await Patente.findById(id);
      if (!patente) {
        return res.status(404).json({ message: "Patente não encontrada!" });
      }
      patente.codigo = codigo;
      patente.descricao = descricao;
      const updatedPatente = await patente.save();
      return res.json(updatedPatente);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export const patenteController = new PatenteController();
