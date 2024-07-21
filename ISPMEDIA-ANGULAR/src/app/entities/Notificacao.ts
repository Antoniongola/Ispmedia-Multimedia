import {User} from "./User";
import {EstadoEntrega} from "./enums/EstadoEntrega";
import {TipoNotificacao} from "./enums/TipoNotificacao";
import {GrupoConvite} from "./GrupoConvite";

export class Notificacao {
  id!: number;
  emissor: User = new User;
  destinatario: User = new User();
  descricao: string="";
  estadoEntregaNotificacao: EstadoEntrega = EstadoEntrega.PENDENTE;
  tipoNotificacao!:TipoNotificacao;
  convite:GrupoConvite=new GrupoConvite();

  constructor() {
  }
}
