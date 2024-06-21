import {Component, OnInit} from '@angular/core';
import {NotificacaoService} from "../../services/notificacao/notificacao.service";
import {LoginServiceService} from "../../services/login/login-service.service";
import {Notificacao} from "../../entities/Notificacao";
import {TipoNotificacao} from "../../entities/enums/TipoNotificacao";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css'
})
export class NotificacoesComponent implements OnInit{
  username:any='';
  notificacoes:Notificacao[]=[];
  isAdmin:boolean=false;
  constructor(private notificacaoService:NotificacaoService,
              private loginService:LoginServiceService,
              private userService:UserService){ }

  ngOnInit() {
    this.username = this.loginService.getUsername();
    this.userService.isAdmin(this.username).subscribe(response=>{
      this.isAdmin = response;
    });
    if(this.isAdmin){
      this.notificacaoService.getAllNotifications().subscribe(response=>{
        this.notificacoes = response;
      });
    }else{
      this.notificacaoService.getUserNotifications(this.username).subscribe(response => {
        this.notificacoes = response;
      });
    }
  }

  protected readonly TipoNotificacao = TipoNotificacao;
}
