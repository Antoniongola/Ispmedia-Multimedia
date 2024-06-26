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
              private router:Router){ }

  ngOnInit(): void {
    if(!this.apiService.isLoggedIn())
      this.goToLogin();

    this.username=this.apiService.getUsername();
    this.grupoService.todosGrupos().subscribe(rresponse=>{
      this.grupos=rresponse;
    });

    this.playlistService.allPlaylistPublicas(this.username).subscribe(response=>{
      this.playlists = response;
      console.log('LISTAS CRIADAS!');
    }, error=>{
      console.log('ERRO, '+error);
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
