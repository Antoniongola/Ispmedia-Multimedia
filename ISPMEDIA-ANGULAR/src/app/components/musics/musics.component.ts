import {Component, OnInit} from '@angular/core';
import {Musica} from "../../entities/Musica";
import {MusicaService} from "../../services/musica/musica.service";
import {ActivatedRoute} from "@angular/router";
import {LoginServiceService} from "../../services/login/login-service.service";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {GrupoService} from "../../services/grupo/grupo.service";
import {Grupo} from "../../entities/Grupo";
import {Playlist} from "../../entities/Playlist";
import {OfflineService} from "../../services/offline/offline.service";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrl: './musics.component.css'
})
export class MusicsComponent implements OnInit{
  musicas:Musica[]=[];
  musicaSrcs: { [key: string]: any } = {}
  imgSrcs: { [key: string]: any } = {}
  myPlaylists:Playlist[]=[];
  myGroups:Grupo[]=[];
  mediaId:any="";
  username:any="";
  isPlaying=false;
  letra="";
  constructor(private musicaService:MusicaService,
              private router:ActivatedRoute,
              private loginService:LoginServiceService,
              private playlisService:PlaylistService,
              private grupoService:GrupoService,
              private offlineService:OfflineService){

  }

  ngOnInit(): void {
    this.username=this.loginService.getUsername();
    this.router.paramMap.subscribe(response=>{
      this.mediaId = response.get('musicId');
    });

    this.musicaService.getAllMusics().subscribe(response=>{
      this.musicas = response;
      this.musicaService.loadImages(this.musicas, this.imgSrcs);
    }, error => {
      console.log('erro nas músicas')
    });

    this.playlisService.allUserPlaylist(this.username).subscribe(response=>{
      this.myPlaylists=response;
    });

    this.grupoService.todosGruposDoUser(this.username).subscribe(response=>{
      this.myGroups=response;
    })
  }

  downloadMusica(musica:Musica){
    this.offlineService.downloadContent(musica);
  }

  addToPlaylist(playlistId:any, musica:Musica){
    console.log('teste da múzca: '+musica.id);
    this.playlisService.addMusicToPlaylist(playlistId, musica).subscribe(response=>{
      alert(response.response);
    }, error=>{
      console.log('erro: '+error);
    })
  }

  addToGrupo(id:any, conteudo:(Musica)){
    this.grupoService.addConteudoGrupo(id, conteudo);
  }

  playMusic(filename: Musica) {
    this.isPlaying=true;
    this.letra=filename.letra;
    this.mediaId=filename.id;
    this.musicaService.loadMusica(filename, this.musicaSrcs);
  }

  deleteMusic(id:string){
    this.musicaService.deleteMusic(id).subscribe(response=>{
      alert('música apagada com sucesso!');
    });
  }
}
