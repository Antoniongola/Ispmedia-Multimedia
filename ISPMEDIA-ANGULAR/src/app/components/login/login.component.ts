import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from "../../services/login-service.service";
import {LoginDto} from "../../dtos/LoginDto";
import {LoginResponse} from "../../dtos/LoginResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  loginResponse !: LoginResponse;

  constructor(private router:Router, private fb:FormBuilder, private service: LoginServiceService) {
  }
  ngOnInit(): void {
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
      this.router.navigate(['']);
      console.log(this.loginResponse.accessToken);
    },error => {
      console.error('Upload failed', error);
    });
  }

}
