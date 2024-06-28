import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "./services/login/login-service.service";
import {LoginDto} from "./dtos/LoginDto";
import {ArtistaService} from "./services/artista/artista.service";
import {Artista} from "./entities/Artista";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private apiService: LoginServiceService, private artista:ArtistaService) {
  }

  ngOnInit() {
    if(!this.apiService.isLoggedIn())
      this.apiService.loginRedirect();
  }
}
