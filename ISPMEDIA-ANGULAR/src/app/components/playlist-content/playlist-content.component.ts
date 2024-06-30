import { Component } from '@angular/core';
import {Conteudo} from "../../entities/Conteudo";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Playlist} from "../../entities/Playlist";

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrl: './playlist-content.component.css'
})
export class PlaylistContentComponent {
  playlist:Playlist=new Playlist();
  playlistId:any="";

  constructor(private playlistServices:PlaylistService,private routes:ActivatedRoute) {
    this.routes.paramMap.subscribe(params=>{
      this.playlistId= params.get('playlistId');
    });
    this.playlistServices.getPlaylist(this.playlistId).subscribe(response=>{
      this.playlist=response;
      console.log("Playlist carregada com sucesso");
    },error => {
      alert("Deu erro na requisição de getPlaylists ");
    });
  }

}
