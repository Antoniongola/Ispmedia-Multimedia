import {Component, OnInit} from '@angular/core';
import {LoginServiceService} from "../../services/login/login-service.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isEditor:boolean=false;
  constructor(private loginService:LoginServiceService) {
  }

  ngOnInit() {

  }

  logOut(){
    this.isEditor=false;
    this.loginService.logOut();
  }

  isLoggedIn():boolean{
      return this.loginService.isLoggedIn();
  }
}
