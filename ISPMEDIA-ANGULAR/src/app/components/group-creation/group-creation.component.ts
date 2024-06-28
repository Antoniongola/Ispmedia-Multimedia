import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../entities/User";
import {UserService} from "../../services/user/user.service";
import {LoginServiceService} from "../../services/login/login-service.service";
import {GrupoService} from "../../services/grupo/grupo.service";
import {Grupo} from "../../entities/Grupo";
import {Participante} from "../../entities/Participante";
import {TipoParticipante} from "../../entities/enums/TipoParticipante";

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent implements OnInit{
  groupForm!:FormGroup;
  users!:User[];
  participantes:Participante[]=[]
  owner:any='';
  submittedItems:any[]=[];

  constructor(private userService:UserService,
              private loginService:LoginServiceService,
              private grupoService:GrupoService,
              private fb:FormBuilder) {  }

  ngOnInit() {
    this.owner = this.loginService.getUsername();
    this.groupForm = this.fb.group({
      nome:['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });

    this.userService.selecionarTodosUsersExcepto(this.owner).subscribe(response=>{
      this.users = response;
      console.log("USERS CARREGADOS COM SUCESSO!");
    }, error=>{
      console.log("DEU ERRADO"+ error);
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  get items(): FormArray {
    return this.groupForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit(){
    const groupOwner:Participante=new Participante();
    groupOwner.user.username=this.owner;
    groupOwner.tipo=TipoParticipante.OWNER;
    this.participantes.push(groupOwner);

    this.submittedItems = this.groupForm.value.items;
    this.submittedItems.map(id=>{
      let user:User=new User();
      let participante:Participante=new Participante();
      user.username = id.name;
      participante.user=user;
      participante.tipo=TipoParticipante.PARTICIPANTE;
      this.participantes.push(participante);
    });

    let grupo:Grupo=new Grupo();
    grupo.nome = this.groupForm.get('nome')?.value;
    grupo.owner = groupOwner.user;
    grupo.participantes = this.participantes;

    this.grupoService.criarGrupo(grupo).subscribe(response=>{
      alert('Grupo criado com sucesso!');
      this.submittedItems=[];
      this.participantes=[];
    }, error=>{
      alert('ERRO, NÃO FOI POSSÍVEL CRIAR O GRUPO!');
      this.submittedItems=[];
      this.participantes=[];
    });
  }

}
