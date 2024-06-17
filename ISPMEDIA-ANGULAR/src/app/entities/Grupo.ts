import {User} from "./User";

export class Grupo{
  id!: number;
  nome: string="";
  dataCriacao!: Date;
  criador: User = new User();
  editores: User[]=[];
  participantes: User[]=[];
  constructor() {
  }
}
