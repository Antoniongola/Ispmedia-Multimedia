import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from "../../services/login/login-service.service";
import {LoginDto} from "../../dtos/LoginDto";
import {LoginResponse} from "../../dtos/LoginResponse";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  loginResponse !: LoginResponse;

  constructor(private router:Router, private fb:FormBuilder,
              private service: LoginServiceService, private userService:UserService) {
  }
  ngOnInit(): void {
    if(this.service.isLoggedIn())
      this.router.navigate(['/']);

    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit():void{
    if(this.loginForm.invalid)
      return ;

    const formValue = this.loginForm.value;
    const dto : LoginDto = new LoginDto(formValue.username, formValue.password);
    this.service.login(dto).subscribe(response =>{
      this.loginResponse = response;
      this.service.saveToken(this.loginResponse.accessToken);
      this.service.saveUsername(dto.username);
      this.userService.selecionarUser(dto.username).subscribe(response=>{
        const user = response;
        user.isOnline = true;
        this.userService.updateUser(user, user.username);
      })
      alert('LOGIN FEITO COM SUCESSO, SEJA BEM-VINDO AO SNT-ISPMEDIA!');
      this.router.navigate(['']);
    },error => {
      alert('ERRO, CREDENCIAIS INVÁLIDAS!!');
    });
  }
}
