import { Conteudo } from './Conteudo';
import { Musica } from './Musica';
import { Artista } from './Artista';
import { Critica } from './Critica';
import {Genero} from "./Genero";

export class Album extends Conteudo {
  musics: Musica[];
  artista: Artista;
  criticas: Critica[];
  pontuacaoMedia: number;

  constructor(id: string, titulo: string, thumbNailUri: string, descricao: string, genero:Genero,musics: Musica[], artista: Artista, criticas: Critica[], pontuacaoMedia: number) {
    super(id, titulo, thumbNailUri, descricao, genero);
    this.musics = musics;
    this.artista = artista;
    this.criticas = criticas;
    this.pontuacaoMedia = pontuacaoMedia;
  }
}
