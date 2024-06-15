// src/app/models/playlist.model.ts

import {User} from "./User";
import {Privacidade} from "./enums/Privacidade";
import {Musica} from "./Musica";

export class Playlist {
  id!: number;
  titulo!: string;
  musicas!: Musica[];
  owner!: User;
  privacidade!: Privacidade;

}
