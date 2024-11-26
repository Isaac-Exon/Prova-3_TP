import mongoose from "mongoose";
const { Schema } = mongoose;

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

const Patente = mongoose.model("Patente", PatenteSchema);

export default Patente;
