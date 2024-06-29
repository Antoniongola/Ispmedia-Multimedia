import {Component, OnInit} from '@angular/core';
import {NotificacaoService} from "../../services/notificacao/notificacao.service";
import {LoginServiceService} from "../../services/login/login-service.service";
import {Notificacao} from "../../entities/Notificacao";
import {TipoNotificacao} from "../../entities/enums/TipoNotificacao";
import {UserService} from "../../services/user/user.service";
import {EstadoEntrega} from "../../entities/enums/EstadoEntrega";
import {GrupoConvite} from "../../entities/GrupoConvite";
import {GrupoConviteService} from "../../services/grupoConvite/grupo-convite.service";

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css'
})
export class NotificacoesComponent implements OnInit{
  username:any='';
  notificacoes:Notificacao[]=[];
  estadoPendente:EstadoEntrega=EstadoEntrega.PENDENTE;
  convites:GrupoConvite[]=[];
  constructor(private notificacaoService:NotificacaoService,
              private loginService:LoginServiceService,
              private userService:UserService,
              private grupoConvite:GrupoConviteService){
    this.username = this.loginService.getUsername();
  }

  ngOnInit() {
    this.notificacaoService.getUserNotifications(this.username).subscribe(response => {
      this.notificacoes = response;
      console.log('pegou ya?');
    }, error=>{
      console.log('error ya!')
    });

    this.grupoConvite.userConvite(this.username).subscribe(response=>{
      this.convites = response;
      console.log('Deu certo nos grupos convites')
    }, error=>{
      console.log('Erro no convite!');
    })
  }

  protected readonly TipoNotificacao = TipoNotificacao;
}
