import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "../../services/login/login-service.service";
import {Router} from "@angular/router";
import {GrupoService} from "../../services/grupo/grupo.service";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {Grupo} from "../../entities/Grupo";
import {Playlist} from "../../entities/Playlist";
import {GrupoConviteService} from "../../services/grupoConvite/grupo-convite.service";
import {GrupoConvite} from "../../entities/GrupoConvite";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username:any='';
  grupos : Grupo[]=[];
  playlists:Playlist[]=[];
  grupoRequest:{[key:string]:boolean}={};
  constructor(private apiService: LoginServiceService,
              private grupoService:GrupoService,
              private playlistService:PlaylistService,
              private grupoConviteService:GrupoConviteService,
              private router:Router){
  }

  ngOnInit(): void {
    if(!this.apiService.isLoggedIn())
      this.goToLogin();

    this.username=this.apiService.getUsername();
    this.playlistService.allPlaylistPublicas(this.username).subscribe(response=>{
      this.playlists = response;
    }, error=>{
      console.log('ERRO NAS PLAYLISTS, '+error);
    });

    this.grupoService.todosGrupos().subscribe(rresponse=>{
      this.grupos=rresponse;
      this.grupos.forEach(grupo=>{
        this.grupoRequest[grupo.id]=false;
      });
      console.log('grupos carregados!');
    }, error=>{
      console.log('erro nos grupos');
    });
  }

  apagarPlaylist(id:any){
    this.playlistService.apagarPlaylist(id).subscribe(response=>{
      alert(response.response);
    }, error=>{
      console.log('erro ao apagar');
    });
  }

  goToLogin(){
    this.apiService.loginRedirect();
  }

  isPartOfGroup(grupo:Grupo, username:string):boolean{
    let participante:boolean=false;
    grupo.participantes.forEach(participant=>{
      if(participant.user.username.toLowerCase()==username.toLowerCase()) {
        participante = true;
      }
    });

    return  participante;
  }

  goToCriarGrupoForm() {
    this.router.navigate(['/group/new']);
  }

  goToCriarPlaylistForm() {
    this.router.navigate(['/playlist/new']);
  }

  pedirEntrarNoGrupo(grupo:Grupo){
    let convite:GrupoConvite=new GrupoConvite();
    convite.grupo=grupo;
    convite.anfitriao.username=this.username;
    this.grupoConviteService.pedirEntarNoGrupo(convite, convite.grupo.id).subscribe(response=>{
      alert(response.response);
      this.grupoRequest[grupo.id]=true;
    });
  }
}
