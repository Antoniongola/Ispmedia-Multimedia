import { Conteudo } from './Conteudo';
import { Album } from './Album';
import {Genero} from "./Genero";

export class Artista extends Conteudo {
  albums: Album[];

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero ,albums: Album[]) {
    super(id, titulo, thumbNailUri, descricao, genero);
    this.albums = albums;
  }
}
