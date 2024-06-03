import { Conteudo } from './Conteudo';
import { Album } from './Album';
import {Genero} from "./Genero";

export class Artista extends Conteudo {
  albums: Album[];
  anoInicioCarreira:number;
  anoFimCarreira:number;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero, editora:string, albums: Album[], inicio:number, fim:number) {
    super(id, titulo, thumbNailUri, descricao, genero, editora);
    this.albums = albums;
    this.anoFimCarreira = fim;
    this.anoInicioCarreira = inicio;
  }
}
