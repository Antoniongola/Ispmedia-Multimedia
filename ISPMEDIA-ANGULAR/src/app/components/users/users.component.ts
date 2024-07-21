import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../entities/User";
import {LoginServiceService} from "../../services/login/login-service.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  isEditor=false;
  username:any="";
  participantes:User[]=[];
  constructor(private userService:UserService,
              private loginService:LoginServiceService) {
  }

  ngOnInit() {
    this.username = this.loginService.getUsername();
    this.userService.selecionarTodosUsersExcepto(this.username).subscribe(response=>{
      this.participantes = response;
      console.log('participantes: '+this.participantes.length);
    });
  }

  userActions(user:User){
    this.userService.promoteUser(user.username).subscribe(response=>{
      alert('USER PROMOVIDO PARA EDITOR!!');
    })
  }
}
