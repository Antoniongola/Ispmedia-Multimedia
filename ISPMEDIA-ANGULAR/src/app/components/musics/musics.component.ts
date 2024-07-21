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
import {FormBuilder, FormGroup} from "@angular/forms";
import {Conteudo} from "../../entities/Conteudo";
import {User} from "../../entities/User";
import {Genero} from "../../entities/Genero";
import {ConteudoService} from "../../services/conteudo/conteudo.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrl: './musics.component.css'
})
export class MusicsComponent implements OnInit{
  musicUpdateForm!:FormGroup;
  musicId='';
  musicas:Musica[]=[];
  musicaSrcs: { [key: string]: any } = {}
  imgSrcs: { [key: string]: any } = {}
  myPlaylists:Playlist[]=[];
  myGroups:Grupo[]=[];
  mediaId:any="";
  username:any="";
  isEditor=false;
  isPlaying=false;
  isVisible=false;
  letra="";
  constructor(private musicaService:MusicaService,
              private conteudoService:ConteudoService,
              private router:ActivatedRoute,
              private loginService:LoginServiceService,
              private playlisService:PlaylistService,
              private grupoService:GrupoService,
              private offlineService:OfflineService,
              private fb:FormBuilder,
              private userService:UserService){

  }

  ngOnInit(): void {
    this.username=this.loginService.getUsername();
    this.userService.isEditor(this.username).subscribe(response=>{
      this.isEditor=response;
    })
    this.musicUpdateForm = this.fb.group({
      nome:'',
      descricao:''
    })

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

  open(musica:Musica) {
    this.musicId = musica.id;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  downloadMusica(musica:Musica){
    this.offlineService.downloadContent(musica);
  }

  addToPlaylist(playlistId:any, musica:Musica){
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

  atualizarMusica(){
    let content:Conteudo=new Conteudo(this.musicId, '', '', '', new Genero(), '', new User());
    content.titulo = this.musicUpdateForm.get('nome')?.value;
    content.descricao = this.musicUpdateForm.get('descricao')?.value;
    this.conteudoService.updateConteudo(content, content.id).subscribe(response=>{
      alert('CONTEÚDO DA MÚSICA ALTERADO COM SUCESSO');
    })
  }
}
