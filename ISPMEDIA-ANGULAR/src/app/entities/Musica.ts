import { Conteudo } from './Conteudo';
import { Artista } from './Artista';
import { Album } from './Album';
import {Genero} from "./Genero";

export class Musica extends Conteudo {
  artists: Artista[];
  album: Album|null;
  duration: number;
  path: string;
  letra:string;
  dataLancamento:string;
  streams:number;
  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string,
              genero:Genero, editora:string, artists: Artista[],
              album: Album|null, duration: number, path: string,
              letra:string, dataLancamento:string, streams:number) {
    super(id, titulo, thumbNailUri, descricao, genero, editora);
    this.artists = artists;
    this.album = album;
    this.duration = duration;
    this.path = path;
    this.letra = letra;
    this.dataLancamento= dataLancamento;
    this.streams = streams;
  }
}
