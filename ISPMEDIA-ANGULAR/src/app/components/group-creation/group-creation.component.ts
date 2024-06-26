import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Musica} from "../../entities/Musica";
import {MusicaService} from "../../services/musica/musica.service";
import {User} from "../../entities/User";
import {UserService} from "../../services/user/user.service";
import {LoginServiceService} from "../../services/login/login-service.service";
import {Artista} from "../../entities/Artista";
import {Genero} from "../../entities/Genero";
import {GrupoService} from "../../services/grupo/grupo.service";

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent implements OnInit{
  groupForm!:FormGroup;
  users!:User[];
  participantes:User[]=[]
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
    this.submittedItems = this.groupForm.value.items;
    this.submittedItems.map(id=>{
      let user:User=new User();
      user.username = id.name;
      this.participantes.push(user);
    });
  }

}
