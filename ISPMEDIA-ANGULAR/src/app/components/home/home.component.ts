import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "../../services/login-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  token : string | null = this.apiService.getToken();
  albuns = ['', '', '', '', '', ''];
  constructor(private apiService: LoginServiceService){

  }

  ngOnInit(): void {
  }

  terminarSessao():void{
    this.apiService.deleteToken();
  }

}
