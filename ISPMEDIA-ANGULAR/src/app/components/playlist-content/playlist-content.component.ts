import {Component, OnInit} from '@angular/core';
import {Conteudo} from "../../entities/Conteudo";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Playlist} from "../../entities/Playlist";
import {Musica} from "../../entities/Musica";
import {Video} from "../../entities/Video";
import {ConteudoService} from "../../services/conteudo/conteudo.service";

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrl: './playlist-content.component.css'
})
export class PlaylistContentComponent {
  playlist:Playlist=new Playlist();
  playlistId:any="";
  mediaId:any="";
  srcs:{[key:string]:any}={}
  hasRequested:boolean=false;
  isVideo:boolean=false;
  isMusic:boolean=false;

  constructor(private playlistServices:PlaylistService,
              private conteudoService:ConteudoService,
              private routes:ActivatedRoute) {
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

  playMedia(conteudo:Musica|Video){
    this.mediaId = conteudo.id;
    if(!this.hasRequested){
      this.hasRequested=true;
      this.conteudoService.loadConteudos(this.playlist.conteudos, this.srcs);
    }

    if(conteudo.dataType=="video"){
      this.isMusic=false;
      this.isVideo = true;
    }else if(conteudo.dataType=="musica"){
      this.isMusic=true;
      this.isVideo = false;
    }
  }


}
