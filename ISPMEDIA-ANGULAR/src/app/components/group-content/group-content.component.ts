import {Component} from '@angular/core';
import {Participante} from "../../entities/Participante";
import {ParticipanteService} from "../../services/participante/participante.service";
import {ActivatedRoute} from "@angular/router";
import {TipoParticipante} from "../../entities/enums/TipoParticipante";
import {LoginServiceService} from "../../services/login/login-service.service";
import {ParticipanteDto} from "../../dtos/ParticipanteDto";
import {User} from "../../entities/User";
import {GrupoService} from "../../services/grupo/grupo.service";

@Component({
  selector: 'app-group-content',
  templateUrl: './group-content.component.html',
  styleUrl: './group-content.component.css'
})
export class GroupContentComponent {
  participantes:Participante[]=[];
  groupId:any="";
  username:any="";
  tipoParticipante=TipoParticipante;
  participanteGrupo!:Participante;
  isOwner=false;
  isEditor=false;

  constructor(private participanteService:ParticipanteService,
              private route:ActivatedRoute,
              private grupoService:GrupoService,
              private loginService:LoginServiceService) {
    this.username = this.loginService.getUsername();
    this.route.paramMap.subscribe(response=>{
      this.groupId = response.get('groupId');
      this.participanteService.isGroupAdmin(this.groupId, this.username).subscribe(response=>{
        this.isOwner = response;
        console.log('admin: ', response);
      });
      this.participanteService.isGroupEditor(this.groupId, this.username).subscribe(response=>{
        this.isEditor = response;
        console.log('editor: ', response);
      });
      this.participanteService.getParticipantesByGroup(this.groupId).subscribe(response=>{
        this.participantes = response;
        this.participanteGrupo=this.getParticipanteByUsername(this.username);
      });
    });
  }

  getParticipanteByUsername(username:string):Participante{
    let pt=new Participante();
    this.participantes.forEach(participante=>{
      if(participante.user.username==this.username) {
        pt = participante;
      }
    });

    if(pt.tipo==0) {
      this.isOwner = true;
      console.log('é owner ya?')
    }
    else if(pt.tipo==this.tipoParticipante.EDITOR) {
      this.isEditor = true;
      console.log('é editor ya?');
    } else{
      console.log('fuuuuuck');
    }

    console.log('nome: '+pt.user.nome);
    console.log('role: '+pt.tipo);
    return pt;
  }

  grupoActions(pt:Participante, opcao:number){
    if(opcao==1){
      let dto:ParticipanteDto=new ParticipanteDto(this.tipoParticipante.OWNER, this.username);
      this.participanteService.makeGroupRole(pt.id, dto).subscribe(response=>{
        alert('Novo papel para o '+pt.user.nome+' no grupo: OWNER');
      });
    }else if(opcao == 2){
      let dto:ParticipanteDto=new ParticipanteDto(this.tipoParticipante.EDITOR, this.username);
      this.participanteService.makeGroupRole(pt.id, dto).subscribe(response=>{
        alert('Novo papel para o '+pt.user.nome+' no grupo: EDITOR');
      });
    }
  }

  protected readonly TipoParticipante = TipoParticipante;
}
