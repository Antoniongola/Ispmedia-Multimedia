import { Conteudo } from './Conteudo';
import { Artista } from './Artista';
import { Album } from './Album';
import {Genero} from "./Genero";

export class Musica extends Conteudo {
  artists: Artista[];
  album: Album;
  duration: number;
  path: string;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero ,artists: Artista[], album: Album, duration: number, path: string) {
    super(id, titulo, thumbNailUri, descricao, genero);
    this.artists = artists;
    this.album = album;
    this.duration = duration;
    this.path = path;
  }
}
