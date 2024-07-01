// src/app/models/playlist.model.ts

import {User} from "./User";
import {Privacidade} from "./enums/Privacidade";
import {Conteudo} from "./Conteudo";
import {Video} from "./Video";
import {Musica} from "./Musica";

export class Playlist {
  id: number=0;
  titulo: string="";
  conteudos: (Video|Musica)[]=[];
  owner: User=new User();
  privacidade: Privacidade=Privacidade.PRIVADO;
  constructor() {
  }

}
