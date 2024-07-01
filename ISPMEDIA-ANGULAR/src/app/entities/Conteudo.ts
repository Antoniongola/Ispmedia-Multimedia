import {Genero} from "./Genero";
import {Artista} from "./Artista";
import {User} from "./User";

export class Conteudo {
  id: string=""; // UUID
  titulo: string="";
  thumbNailUri: string="";
  descricao: string="";
  genero:Genero=new Genero();
  editora:string="";
  criadorConteudo:User=new User();
  dataType:string="";

  constructor(id: string, titulo: string, thumbNailUri: string,
              descricao: string, genero:Genero,
              editora:string, criadorConteudo:User) {
    this.id = id;
    this.titulo = titulo;
    this.thumbNailUri = thumbNailUri;
    this.descricao = descricao;
    this.genero = genero;
    this.editora = editora;
    this.criadorConteudo = criadorConteudo;
  }
}
