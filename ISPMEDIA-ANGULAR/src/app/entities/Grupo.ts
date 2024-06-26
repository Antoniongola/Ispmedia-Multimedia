import {Participante} from "./Participante";
import {User} from "./User";
import {Conteudo} from "./Conteudo";

export class Grupo{
  id!: number;
  nome: string="";
  owner:User= new User();
  dataCriacao!: Date;
  participantes:Participante[]=[];
  conteudoGrupo:Conteudo[]=[];
  constructor() {
  }
}
