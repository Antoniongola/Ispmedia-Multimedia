import { Conteudo } from './Conteudo';
import { Musica } from './Musica';
import { Artista } from './Artista';
import { Critica } from './Critica';
import {Genero} from "./Genero";
import {User} from "./User";

export class Album extends Conteudo {
  musics: Musica[]|null;
  artista: Artista|null;
  criticas: Critica[];
  pontuacaoMedia: number;
  dataLancamento:string;
  streams : number;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero,editora:string,
              user:User, musics: Musica[]|null, artista: Artista|null, criticas: Critica[], pontuacaoMedia: number,
              dataLancamento:string, streams:number) {
    super(id, titulo, thumbNailUri, descricao, genero, editora, user);
    this.musics = musics;
    this.artista = artista;
    this.criticas = criticas;
    this.pontuacaoMedia = pontuacaoMedia;
    this.streams = streams;
    this.dataLancamento = dataLancamento;
  }
}
