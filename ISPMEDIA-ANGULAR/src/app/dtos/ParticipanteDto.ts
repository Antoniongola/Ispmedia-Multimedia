import {TipoParticipante} from "../entities/enums/TipoParticipante";

export class ParticipanteDto {
  tipo: TipoParticipante=TipoParticipante.PARTICIPANTE;
  promotor: string="";
  constructor(tipoPt:TipoParticipante, promotor:string) {
    this.tipo=tipoPt;
    this.promotor=promotor;
  }
}
