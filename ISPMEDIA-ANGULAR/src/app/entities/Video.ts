import {Conteudo} from "./Conteudo";
import {Genero} from "./Genero";
import {User} from "./User";

export class Video extends Conteudo{
  duration:number = 0;
  path:string = '';
  streams:number = 0;

  constructor(id: string, titulo: string, thumbNailUri: string,
              descricao: string, genero:Genero, editora:string, user:User) {
    super(id, titulo, thumbNailUri, descricao, genero, editora, user);
  }
}
