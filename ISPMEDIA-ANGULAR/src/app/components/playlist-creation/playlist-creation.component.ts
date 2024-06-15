import {Component, OnInit} from '@angular/core';
import {MusicaService} from "../../services/musica/musica.service";
import {Musica} from "../../entities/Musica";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-playlist-creation',
  templateUrl: './playlist-creation.component.html',
  styleUrl: './playlist-creation.component.css'
})
export class PlaylistCreationComponent implements OnInit{
  playlistForm!:FormGroup;
  musicas!:Musica[];

  constructor(private musicaService:MusicaService,
              private fb:FormBuilder) {
  }

  ngOnInit() {
    this.playlistForm = this.fb.group({
      nome:['', Validators.required],
      privacidade:['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });

    this.musicaService.getAllMusics().subscribe(response=>{
      this.musicas=response;
      console.log("MÚSICAS CARREGADAS COM SUCESSO!");
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
    return this.playlistForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit(){

  }

}
