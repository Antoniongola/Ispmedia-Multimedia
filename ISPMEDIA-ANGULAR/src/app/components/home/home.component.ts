import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "../../services/login/login-service.service";
import {Router} from "@angular/router";
import {GrupoService} from "../../services/grupo/grupo.service";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {Grupo} from "../../entities/Grupo";
import {Playlist} from "../../entities/Playlist";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username:any='';
  grupos : Grupo[]=[];
  playlists:Playlist[]=[];
  constructor(private apiService: LoginServiceService,
              private grupoService:GrupoService,
              private playlistService:PlaylistService,
              private router:Router){
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
      console.log('grupos carregados!');
    }, error=>{
      console.log('erro nos grupos');
    });
  }

  ngOnInit(): void {

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

  goToCriarGrupoForm() {
    this.router.navigate(['/group/new']);
  }

  goToCriarPlaylistForm() {
    this.router.navigate(['/playlist/new']);
  }
}
