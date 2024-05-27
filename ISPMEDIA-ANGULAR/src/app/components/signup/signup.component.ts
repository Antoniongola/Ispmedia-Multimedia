import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginServiceService} from "../../services/login-service.service";
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

  constructor(private router:Router, private fb:FormBuilder, private service: SignupService) {
  }

  onSubmit():void{
    if(this.signupForm.invalid)
      return ;
    const formValue = this.signupForm.value;
    const dto = new SignupDto(formValue.nome, formValue.username, formValue.password);
    this.service.cadastrar(dto).subscribe((response)=>{
      this.resultado = response;
      console.log(response);
      if(this.resultado.response == this.teste)
        this.router.navigate(['']);

    },error => {
      console.error('Upload failed', error);
    });
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nome : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }
}
