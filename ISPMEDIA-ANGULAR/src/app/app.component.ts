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
  title = 'ISPMEDIA-ANGULAR';
  resultado:any;
  artistas!:Artista;
  token:string | null = this.apiService.getToken();
  constructor(private apiService: LoginServiceService, private artista:ArtistaService) {
  }

  ngOnInit() {
    this.apiService.login(new LoginDto("ngolajr", "123456")).subscribe(
      response=>{
        this.resultado = response;
        //localStorage.setItem('jwtToken', this.resultado);
      });

    this.artista.getArtista("36351b30-8d34-4d71-985c-3824d50b20b2").subscribe(
      response=>{
        this.artistas = response;
      });

    //this.token = this.apiService.getToken();
  }
}
