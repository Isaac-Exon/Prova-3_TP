import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fetch from "node-fetch";
import routes from "./routes";
import MilitarModel from "./models/MilitarModel";
import SoldadoModel from "./models/SoldadoModel";
import PatenteModel from "./models/PatenteModel";

dotenv.config();

const uri = "mongodb://127.0.0.1:27017/prova3";

// Função de mascaramento de telefone
function phoneMask(v: string | undefined): string | undefined {
  if (v === undefined) {
    return;
  }
  let r = v.replace(/\D/g, ""); // Remove caracteres não numéricos
  r = r.replace(/^0/, ""); // Remove o primeiro zero, caso exista
  if (r.length >= 11) {
    r = r.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3"); // Formato (XX) XXXXX-XXXX
  } else if (r.length > 7) {
    r = r.replace(/^(\d{2})(\d{5})(\d{0,5}).*/, "($1) $2-$3"); // Formato (XX) XXXXX-XXXX com até 5 dígitos
  } else if (r.length > 2) {
    r = r.replace(/^(\d{2})(\d{0,5})/, "($1) $2"); // Formato (XX) XXXXXX
  } else if (v.trim() !== "") {
    r = r.replace(/^(\d*)/, "($1"); // Formato (XX
  }
  return r;
}

export default function connect() {
  mongoose.connection.on("connected", () =>
    console.log("Conectado ao MongoDB")
  );
  mongoose.connection.on("open", () =>
    console.log("Conexão aberta com o MongoDB")
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Desconectado do MongoDB")
  );
  mongoose.connection.on("reconnected", () =>
    console.log("Reconectado ao MongoDB")
  );
  mongoose.connection.on("disconnecting", () =>
    console.log("Desconectando do MongoDB")
  );
  mongoose.connection.on("close", () =>
    console.log("Conexão com o MongoDB fechada")
  );

  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((e) => {
      console.error("Erro ao conectar ao MongoDB:", e.message);
    });

  process.on("SIGINT", async () => {
    try {
      console.log("Conexão com o MongoDB fechada");
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error("Erro ao fechar a conexão com o MongoDB:", error);
      process.exit(1);
    }
  });
}

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

connect();

interface Militar {
  id?: string;
  nome: string;
  idade: number;
  email: string;
  fone: string;
}

// Função para persistir militares
const persistirMilitar = async (militar: Militar) => {
  try {
    const response = await fetch("http://localhost:3000/militar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(militar),
    });
    const data = await response.json();
    console.log("Militar criado:", data);
  } catch (error) {
    console.error("Erro ao criar Militar:", error);
  }
};

interface Soldado {
  id?: string;
  cim: number;
  altura: number;
  militar: string;
}

// Função para persistir soldados
const persistirSoldado = async (soldado: Soldado) => {
  try {
    const response = await fetch("http://localhost:3000/soldado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(soldado),
    });
    const data = await response.json();
    console.log("Soldado criado:", data);
  } catch (error) {
    console.error("Erro ao criar Soldado:", error);
  }
};

interface Patente {
  codigo: number;
  descricao: string;
}

// Função para persistir patente
const persistirPatente = async (patente: Patente) => {
  try {
    const response = await fetch("http://localhost:3000/patente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patente),
    });
    const data = await response.json();
    console.log("Patente criada:", data);
  } catch (error) {
    console.error("Erro ao criar Patente:", error);
  }
};

const militar: Militar[] = [
  {
    nome: "Marcos_da_Silva",
    idade: 21,
    email: "marcos.silva@fab.mil.br",
    fone: "12912343567",
  },
  {
    nome: "Ana_Maria_Brega",
    idade: 25,
    email: "ana.brega@fab.mil.br",
    fone: "12999979999",
  },
  {
    nome: "Paulo_França",
    idade: 18,
    email: "paulo.fraca@fab.mil.br",
    fone: "12999967999",
  },
  {
    nome: "Edson Arantes",
    idade: 30,
    email: "edson.arantes@gmail.sp.gov.br",
    fone: "12999957999",
  },
];

const soldado: Soldado[] = [
  { cim: 1234567891, altura: 1.73, militar: "67491549e05e8b29b276d182" },
  { cim: 1212121212, altura: 1.69, militar: "67491549e05e8b29b276d186" },
  { cim: 2121212121, altura: 1.8, militar: "67491549e05e8b29b276d188" },
  { cim: 9876543210, altura: 1.75, militar: "67491549e05e8b29b276d18a" },
];

const patente: Patente[] = [
  { descricao: "Marechal do Ar", codigo: 1 },
  { descricao: "Brigadeiro", codigo: 2 },
  { descricao: "Coronel", codigo: 3 },
  { descricao: "Major", codigo: 4 },
  { descricao: "Capitão", codigo: 5 },
];

// Persistir militares
const persistirMilitares = async (militares: Militar[]) => {
  for (let i = 0; i < militares.length; i++) {
    await persistirMilitar(militares[i]);
  }
};

// Persistir soldados
const persistirSoldados = async (soldados: Soldado[]) => {
  for (let i = 0; i < soldados.length; i++) {
    await persistirSoldado(soldados[i]);
  }
};

// Persistir patentes
const persistirPatentes = async (patentes: Patente[]) => {
  for (let i = 0; i < patentes.length; i++) {
    await persistirPatente(patentes[i]);
  }
};

// Chamada para persistir todos os militares, soldados e patentes
persistirMilitares(militar);
persistirSoldados(soldado);
persistirPatentes(patente);

app.use("/", routes);
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
