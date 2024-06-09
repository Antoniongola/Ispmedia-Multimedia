import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GeneroService} from "../../services/genero/genero.service";
import {Genero} from "../../entities/Genero";
import {Artista} from "../../entities/Artista";
import {ArtistaService} from "../../services/artista/artista.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artist-creation',
  templateUrl: './artist-creation.component.html',
  styleUrl: './artist-creation.component.css'
})
export class ArtistCreationComponent implements OnInit{
  artistForm !: FormGroup;
  generos!:Genero[];
  artistImage!:File;

  constructor(private generoService:GeneroService,
              private artistaService:ArtistaService,
              private fb:FormBuilder,
              private router:Router){}

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
      genero:[''],
      anoInicioCarreira:['0'],
      anoFimCarreira:['0'],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.artistImage = file;
    }
  }

  onSubmit():void{
    if(this.artistImage){
      const genero : Genero = new Genero();
      genero.id = this.artistForm.get('genero')?.value;
      const formData : FormData = new FormData();
      const artista : Artista = new Artista('', this.artistForm.get('nome')?.value,'', this.artistForm.get('descricao')?.value, genero, this.artistForm.get('editora')?.value,[],
        this.artistForm.get('anoInicioCarreira')?.value, this.artistForm.get('anoFimCarreira')?.value);

      //const artistImage :File = this.artistForm.get('artistImage')?.value;

      this.artistaService.addArtista(artista, this.artistImage).subscribe(response=>{
        console.log('DEU CERTO PORRAAAAAAA: '+response);
        alert("NOVO ARTISTA ADICIONADO COM SUCESSO");
        this.router.navigate(['/']);

      }, error=>{
        console.log('DEU ERRADO PIDIMOOOO: '+error);
      });
    }else {
      alert("INSIRA UMA IMAGEM");
    }
  }
}
