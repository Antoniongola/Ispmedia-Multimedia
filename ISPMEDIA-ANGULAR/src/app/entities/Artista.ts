import { Conteudo } from './Conteudo';
import { Album } from './Album';

export class Artista extends Conteudo {
  albums: Album[];

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, albums: Album[]) {
    super(id, titulo, thumbNailUri, descricao);
    this.albums = albums;
  }
}
