import { Router, Request, Response } from "express";
import militarRoutes from "./Militar";
import patenteRoutes from "./Patent";
import soldadoRoutes from "./Soldado";

const routes = Router();

// Define as rotas para cada recurso
routes.use("/militar", militarRoutes);
routes.use("/soldado", soldadoRoutes);
routes.use("/patente", patenteRoutes);

// Rota para requisições desconhecidas
routes.use((_: Request, res: Response) =>
  res.status(404).json({ error: "Requisição desconhecida" })
);

export default routes;
