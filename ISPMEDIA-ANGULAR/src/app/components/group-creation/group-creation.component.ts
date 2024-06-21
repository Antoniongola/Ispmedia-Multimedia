import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Musica} from "../../entities/Musica";
import {MusicaService} from "../../services/musica/musica.service";
import {User} from "../../entities/User";
import {UserService} from "../../services/user/user.service";
import {LoginServiceService} from "../../services/login/login-service.service";

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent {
  groupForm!:FormGroup;
  users!:User[];
  owner:string|null='';
  submittedItems!:any[];

  constructor(private userService:UserService,
              private loginService:LoginServiceService,
              private fb:FormBuilder) {  }

  ngOnInit() {
    this.owner = this.loginService.getUsername();

    this.groupForm = this.fb.group({
      nome:['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });

    this.userService.selecionarTodosUsers().subscribe(response=>{
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
    /*
    this.submittedItems = this.musicForm.value.items;

    this.submittedItems.map(id=>{
      let user:User=new User();
      user.id=id.name;
      this.participantes.push(user);
    });
    */
  }

}
