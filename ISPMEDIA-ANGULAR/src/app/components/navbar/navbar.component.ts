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

  constructor(private loginService:LoginServiceService,
              private userService:UserService) {
  }
  menuAberto = false;

  ngOnInit() {
    this.userService.isEditor(this.loginService.getUsername()).subscribe(response=>{
      this.isEditor = response;
    })
  }
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
  logOut(){
    this.isEditor=false;
    this.loginService.logOut();
  }

  isLoggedIn():boolean{
      return this.loginService.isLoggedIn();
  }
}
