import mongoose from "mongoose";
const { Schema } = mongoose;

// Definição do esquema Militar
const MilitarSchema = new Schema(
  {
    nome: {
      type: String,
      maxlength: [50, "O nome pode ter no máximo 50 caracteres"],
      required: true,
    },
    idade: {
      type: Number,
      max: [999, "A idade não pode ser maior que 999"],
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

const Militar = mongoose.model("Militar", MilitarSchema);

export default Militar;
