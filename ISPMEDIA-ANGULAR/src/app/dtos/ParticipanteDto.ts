import {TipoParticipante} from "../entities/enums/TipoParticipante";

export interface ParticipanteDto {
  tipo: TipoParticipante;
  promotor: string;
}
