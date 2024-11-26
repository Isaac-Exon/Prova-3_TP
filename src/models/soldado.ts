import mongoose from "mongoose";
import Militar from "./militar";
// Importar para validação
const { Schema } = mongoose;

// Definição do esquema Soldado
const SoldadoSchema = new Schema(
  {
    cim: {
      type: Number,
      required: [true, "O CIM é obrigatório"],
      unique: true,
    },
    altura: {
      type: Number,
      required: [true, "A altura é obrigatória"],
    },
    militar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Militar",
      required: true,
      validate: {
        validator: async function (id: string) {
          const militar = await Militar.findById(id); // Verifica se o ID existe na coleção Militar
          return !!militar;
        },
        message: "O Militar fornecido não existe!",
      },
    },
  },
  { timestamps: true }
);

const Soldado = mongoose.model("Soldado", SoldadoSchema);

export default Soldado;
