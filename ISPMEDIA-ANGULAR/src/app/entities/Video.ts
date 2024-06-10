import {Conteudo} from "./Conteudo";
import {Genero} from "./Genero";

export class Video extends Conteudo{
  duration:number = 0;
  path:string = '';
  streams:number = 0;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero, editora:string) {
    super(id, titulo, thumbNailUri, descricao, genero, editora);
  }
}
