import { Component } from '@angular/core';
import {LoginServiceService} from "../../services/login/login-service.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isEditor:boolean=false;
  constructor(private loginService:LoginServiceService,
              private userService:UserService) {
    this.userService.isEditor(this.loginService.getUsername()).subscribe(response=>{
      this.isEditor = response;
    })
  }

  logOut(){
    this.loginService.logOut();
  }

  isLoggedIn():boolean{
      return this.loginService.isLoggedIn();
  }



}
