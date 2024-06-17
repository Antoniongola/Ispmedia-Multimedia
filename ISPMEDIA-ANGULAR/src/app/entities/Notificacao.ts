import {User} from "./User";
import {EstadoEntrega} from "./enums/EstadoEntrega";
import {TipoNotificacao} from "./enums/TipoNotificacao";

export class Notificacao {
  id!: number;
  emissor: User = new User;
  destinatario: User = new User();
  descricao: string="";
  estadoEntregaNotificacao: EstadoEntrega = EstadoEntrega.PENDENTE;
  tipoNotificacao!:TipoNotificacao;

  constructor() {
  }
}
