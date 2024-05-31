import {Genero} from "./Genero";

export class Conteudo {
  id: string; // UUID
  titulo: string;
  thumbNailUri: string;
  descricao: string;
  genero:Genero;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero) {
    this.id = id;
    this.titulo = titulo;
    this.thumbNailUri = thumbNailUri;
    this.descricao = descricao;
    this.genero = genero;
  }
}
