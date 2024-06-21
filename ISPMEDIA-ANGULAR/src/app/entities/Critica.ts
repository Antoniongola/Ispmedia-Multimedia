import {User} from "./User";
import {Album} from "./Album";

export class Critica {
  id: number;
  nota: number;
  critica: string;
  critico:User;
  album:Album;

  constructor(id: number, nota: number, critica: string, critico:User, album:Album) {
    this.id = id;
    this.nota = nota;
    this.critica = critica;
    this.critico = critico;
    this.album = album;
  }
}
