import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GeneroService} from "../../services/genero/genero.service";
import {Genero} from "../../entities/Genero";
import {Artista} from "../../entities/Artista";
import {ArtistaService} from "../../services/artista.service";

@Component({
  selector: 'app-artist-creation',
  templateUrl: './artist-creation.component.html',
  styleUrl: './artist-creation.component.css'
})
export class ArtistCreationComponent implements OnInit{
  artistForm !: FormGroup;
  generos!:Genero[];

  constructor(private generoService:GeneroService,
              private artistaService:ArtistaService,
              private fb:FormBuilder){}

  ngOnInit():void{
    this.generoService.todosGeneros().subscribe(response=>{
      this.generos = response;
    }, error => {
      console.log('erro: '+error);
    })

    this.artistForm = this.fb.group({
      nome:[''],
      editora:[''],
      descricao:[''],
      genero:['0'],
      anoInicioCarreira:['0'],
      anoFimCarreira:['0'],
      artistImage: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.artistForm.patchValue({
        artistImage: file
      });
    }
  }

  onSubmit():void{
    const genero : Genero = new Genero();
    genero.id = this.artistForm.get('genero')?.value;
    const formData : FormData = new FormData();
    const artista : Artista = new Artista('', this.artistForm.get('nome')?.value,'', this.artistForm.get('descricao')?.value, genero, this.artistForm.get('editora')?.value,[],
      this.artistForm.get('anoInicioCarreira')?.value, this.artistForm.get('anoFimCarreira')?.value);
    //const artistImage :File = this.artistForm.get('artistImage')?.value;

    this.artistaService.addArtista(artista, this.artistForm.get('artistImage')?.value).subscribe(response=>{
      console.log('DEU CERTO PORRAAAAAAA');
    }, error=>{
      console.log('DEU ERRADO PIDIMOOOO');
    });
  }
}
