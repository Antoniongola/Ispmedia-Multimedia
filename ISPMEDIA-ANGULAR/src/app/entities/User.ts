import {Playlist} from "./Playlist";
import {Role} from "./enums/Role";

export class User{
  nome:string='';
  username:string='';
  password:string='';
  roles:Role[]=[];
  createdDate:string='';
  playlists:Playlist[]=[];
  isOnline:boolean=false;

  constructor() {
  }
}
