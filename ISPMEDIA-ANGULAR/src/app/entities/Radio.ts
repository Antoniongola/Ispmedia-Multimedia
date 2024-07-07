import {Conteudo} from "./Conteudo";
import {Genero} from "./Genero";
import {User} from "./User";

export class Radio extends Conteudo{
  uri:string;
  constructor(titulo: string, thumbNailUri: string, uri:string) {
    super('',
      titulo,
      thumbNailUri,
      '',
      new Genero(),
      '',
      new User());

    this.uri=uri;
  }
}

/*
id: string,
titulo: string,
thumbNailUri: string,
descricao: string,
genero: Genero,
editora: string,
criadorConteudo: User
 */
