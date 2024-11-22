import mongoose from "mongoose";
const { Schema } = mongoose;

// Esquema para Militar
const MilitarSchema = new Schema(
  {
    nome: {
      type: String,
      maxlength: [50, "O nome pode ter no máximo 50 caracteres"],
      required: true,
    },
    idade: {
      type: Number,
      max: [999, "A idade não pode ser maior que 999"], // Máximo 3 dígitos
      required: [true, "A idade é obrigatória"],
    },
    email: {
      type: String,
      maxlength: [100, "O e-mail pode ter no máximo 100 caracteres"],
      unique: true,
      required: [true, "O e-mail é obrigatório"],
      validate: {
        validator: function (value: string) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
        message: (props: any) =>
          `${props.value} não é um formato de e-mail válido`,
      },
    },
    fone: {
      type: String,
      maxlength: [11, "O número de telefone deve ter no máximo 11 caracteres"],
      validate: {
        validator: function (value: string) {
          const regex = /^[0-9]{10,11}$/; // Apenas números
          return regex.test(value);
        },
        message: (props: any) =>
          `${props.value} não é um número de telefone válido`,
      },
      required: [true, "O número de telefone é obrigatório"],
    },
  },
  { timestamps: true }
);

// Esquema para Soldado
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

// Esquema para Patente
const PatenteSchema = new Schema(
  {
    codigo: {
      type: Number,
      maxlength: [2, "O código pode ter no máximo 2 dígitos"],
      required: true,
    },
    descricao: {
      type: String,
      maxlength: [30, "A descrição pode ter no máximo 30 caracteres"],
      required: true,
    },
  },
  { timestamps: true }
);

// Criação dos modelos
const Militar = mongoose.model("Militar", MilitarSchema);
const Soldado = mongoose.model("Soldado", SoldadoSchema);
const Patente = mongoose.model("Patente", PatenteSchema);

export { Militar, Soldado, Patente };
