import MilitarModel from "./MilitarModel";

class SoldadoModel {
  id: string = "";
  cim: number;
  altura: number;
  militar: MilitarModel;

  constructor(cim: number, altura: number, militar: MilitarModel) {
    this.cim = cim;
    this.altura = altura;
    this.militar = militar;
  }
}

export default SoldadoModel;
