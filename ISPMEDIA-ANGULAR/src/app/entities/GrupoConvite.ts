import {User} from "./User";
import {Grupo} from "./Grupo";
import {EstadoConvite} from "./enums/EstadoConvite";

export class GrupoConvite {
  id!: number;
  anfitriao:User=new User();
  convidado: User = new User();
  grupo: Grupo=new Grupo();
  estadoConvite: EstadoConvite = EstadoConvite.PENDENTE;

  constructor() {
  }
}
