import {Participante} from "./Participante";
import {User} from "./User";
import {Conteudo} from "./Conteudo";

export class Grupo{
  id: number=0;
  nome: string="";
  owner:User= new User();
  dataCriacao: Date=new Date();
  participantes:Participante[]=[];
  conteudoGrupo:Conteudo[]=[];
  constructor() {
  }
}
