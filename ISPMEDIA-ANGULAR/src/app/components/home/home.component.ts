import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "../../services/login/login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  token : string | null = this.apiService.getToken();
  constructor(private apiService: LoginServiceService,
              private router:Router){

  }

  ngOnInit(): void {
    if(!this.apiService.isLoggedIn())
      this.apiService.loginRedirect();
  }

  terminarSessao():void{
    this.apiService.deleteToken();
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
