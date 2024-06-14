import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlbumService} from "../../services/album/album.service";
import {Genero} from "../../entities/Genero";
import {Artista} from "../../entities/Artista";
import {ArtistaService} from "../../services/artista/artista.service";
import {GeneroService} from "../../services/genero/genero.service";
import {Album} from "../../entities/Album";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-creation',
  templateUrl: './album-creation.component.html',
  styleUrl: './album-creation.component.css'
})
export class AlbumCreationComponent implements OnInit{
  albumForm!:FormGroup;
  albumImage!:File;
  generos!:Genero[];
  artistas!:Artista[];
  sArtista!:Artista;

  constructor(private albumService:AlbumService,
              private artistaService:ArtistaService,
              private generoService:GeneroService,
              private fb:FormBuilder,
              private router:Router) {
    this.albumForm = this.fb.group({
      nome:[''],
      descricao:[''],
      genero:[''],
      editora:[''],
      dataLancamento:[''],
      artista:['']
    })
  }

  ngOnInit() {
    this.generoService.todosGeneros().subscribe(response=>{
      this.generos = response;
    }, error=>{
      console.log('erro, impossível carregar gêneros: '+error);
    });

    this.artistaService.getTodosArtistas().subscribe(response=>{
      console.log(response);
      this.artistas = response;
    }, error=>{
      console.log('erro, impossível carregar artistas: '+error);
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.albumImage = file;
    }
  }

  onSubmit(){
    if(this.albumImage){
      this.artistaService.getArtista(this.albumForm.get('artista')?.value).subscribe(response=>{
        this.sArtista = response;
        console.log("grande artista: "+this.sArtista.titulo);
      }, error=>{
        console.log('erro no artista: '+error);
      });
      const genero :Genero = new Genero();
      genero.id=this.albumForm.get('genero')?.value;

      const album : Album = new Album('',
        this.albumForm.get('nome')?.value, '',this.albumForm.get('descricao')?.value,
        genero, this.albumForm.get('editora')?.value,[], this.sArtista, [],0,
        this.albumForm.get('dataLancamento')?.value, 0);

      album.artista = this.sArtista;

      this.albumService.addAlbum(album, this.albumImage).subscribe(response=>{
        alert("ALBUM "+album.titulo+" CRIADO COM SUCESSO")
      }, error=>{
        alert("NAO FOI POSSIVEL CRIAR O ALBUM");
        console.log("DEU ERRO: "+error)
      });
    }else{
      alert("ESCOLHA UMA IMAGEM PRO ALBUM!");
    }
  }

}
