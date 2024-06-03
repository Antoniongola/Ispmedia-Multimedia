import {Genero} from "./Genero";

export class Conteudo {
  id: string; // UUID
  titulo: string;
  thumbNailUri: string;
  descricao: string;
  genero:Genero;
  editora:string;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero, editora:string) {
    this.id = id;
    this.titulo = titulo;
    this.thumbNailUri = thumbNailUri;
    this.descricao = descricao;
    this.genero = genero;
    this.editora = editora;
  }
}
