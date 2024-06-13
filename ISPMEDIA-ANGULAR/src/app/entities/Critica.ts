import {User} from "./User";

export class Critica {
  id: number;
  nota: number;
  critica: string;
  critico!:User;

  constructor(id: number, nota: number, critica: string) {
    this.id = id;
    this.nota = nota;
    this.critica = critica;
  }
}
