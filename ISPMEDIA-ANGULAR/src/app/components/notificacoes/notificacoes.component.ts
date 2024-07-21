import {Component, OnInit} from '@angular/core';
import {NotificacaoService} from "../../services/notificacao/notificacao.service";
import {LoginServiceService} from "../../services/login/login-service.service";
import {Notificacao} from "../../entities/Notificacao";
import {TipoNotificacao} from "../../entities/enums/TipoNotificacao";
import {UserService} from "../../services/user/user.service";
import {GrupoConvite} from "../../entities/GrupoConvite";
import {GrupoConviteService} from "../../services/grupoConvite/grupo-convite.service";
import {GrupoConviteDto} from "../../dtos/GrupoConviteDto";
import {EstadoConvite} from "../../entities/enums/EstadoConvite";
import {PedidoGrupoDto} from "../../dtos/PedidoGrupoDto";

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css'
})
export class NotificacoesComponent implements OnInit{
  username:any='';
  notificacoes:Notificacao[]=[];
  estadoPendente:EstadoConvite=EstadoConvite.PENDENTE;
  estadoConvite=EstadoConvite;
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
      console.log('error ya!');
    });

    this.grupoConvite.userConvite(this.username).subscribe(response=>{
      this.convites = response;
    }, error=>{
      console.log('Erro no convite!');
    })
  }

  isPending(convite:GrupoConvite):boolean{
    let comparacao:boolean=false;
    if(convite.estadoConvite.toString()==='PENDENTE') {
      comparacao = true;
    }

    return comparacao;
  }

  responderPedido(news:Notificacao, opcao:number){
    let dto:PedidoGrupoDto=new PedidoGrupoDto();
    dto.newsId=news.id.toString();
    dto.quemRespondeu=news.destinatario.username;
    dto.quemPdiu=news.emissor.username;
    dto.resposta=opcao;
    dto.conviteId=news.convite.id;
    this.grupoConvite.responderPedido(news.convite.id.toString(), dto).subscribe(response=>{
      alert(response.response);
    }, error=>{
      alert('ERRO AO RESPONDER PEDIDO: '+error);
    });

  }

  responderConvite(conviteId:number, resposta:number){
    const dto:GrupoConviteDto = new GrupoConviteDto(conviteId, resposta);
    this.grupoConvite.responderConvite(dto).subscribe(response=>{
      alert(response.response);
    }, error=>{
      alert('ERRO, IMPOSSÍVEL RESPONDER SOLICITAÇÃO!');
    });
  }

  protected readonly TipoNotificacao = TipoNotificacao;
  protected readonly EstadoConvite = EstadoConvite;
}
