import {TipoParticipante} from "./enums/TipoParticipante";
import {User} from "./User";

export class Participante{
  id!:number;
  user:User=new User();
  tipo:TipoParticipante=TipoParticipante.PARTICIPANTE;
  constructor() {
  }
}
