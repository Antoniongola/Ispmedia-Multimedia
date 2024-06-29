// src/app/models/playlist.model.ts

import {User} from "./User";
import {Privacidade} from "./enums/Privacidade";
import {Conteudo} from "./Conteudo";

export class Playlist {
  id: number=0;
  titulo: string="";
  conteudos: Conteudo[]=[];
  owner: User=new User();
  privacidade: Privacidade=Privacidade.PRIVADO;
  constructor() {
  }

}
