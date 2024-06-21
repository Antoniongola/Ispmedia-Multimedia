import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginServiceService} from "../../services/login/login-service.service";
import {SignupService} from "../../services/signup/signup.service";
import {SignupDto} from "../../dtos/SignupDto";
import {SignupResponse} from "../../dtos/SignupResponse";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  resultado !: SignupResponse;
  teste = "User criado com sucesso!";

  constructor(private router:Router, private fb:FormBuilder,
              private service: SignupService, private loginService:LoginServiceService) {
  }

  ngOnInit(): void {
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }

    this.signupForm = this.fb.group({
      nome : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit():void{
    if(this.signupForm.invalid)
      return ;
    const formValue = this.signupForm.value;
    const dto = new SignupDto(formValue.nome, formValue.username, formValue.password);
    this.service.cadastrar(dto).subscribe((response)=>{
      this.resultado = response;
      if(this.resultado.response == this.teste) {
        alert('CONTA CRIADA COM SUCESSO, FAÇA O LOGIN USANDO AS SUAS CREDENCIAIS.');
        this.router.navigate(['login']);
      }
    }, error=>{
      alert('NÃO FOI POSSÍVEL CRIAR A SUA CONTA: '+error);
    });
  }

}
