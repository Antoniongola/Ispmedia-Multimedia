// src/app/models/playlist.model.ts

import {User} from "./User";
import {Privacidade} from "./enums/Privacidade";
import {Musica} from "./Musica";
import {Conteudo} from "./Conteudo";

export class Playlist {
  id!: number;
  titulo!: string;
  conteudos!: Conteudo[];
  owner!: User;
  privacidade!: Privacidade;


}
