import { Conteudo } from './Conteudo';
import { Artista } from './Artista';
import { Album } from './Album';
import {Genero} from "./Genero";
import {User} from "./User";

export class Musica extends Conteudo {
  artists: Artista[];
  album: Album|null;
  duration: number;
  path: string;
  letra:string;
  dataLancamento:string;
  streams:number;
  artista:Artista=new Artista('', '', '', '', new Genero(), '', new User(), [], 0, 0);
  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string,
              genero:Genero, editora:string, user:User, autor:Artista, artists: Artista[],
              album: Album|null, duration: number, path: string,
              letra:string, dataLancamento:string, streams:number) {
    super(id, titulo, thumbNailUri, descricao, genero, editora, user);
    this.artists = artists;
    this.album = album;
    this.duration = duration;
    this.path = path;
    this.letra = letra;
    this.dataLancamento= dataLancamento;
    this.streams = streams;
    this.artista=autor;
  }
}
