import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlbumService} from "../../services/album/album.service";
import {Genero} from "../../entities/Genero";
import {Artista} from "../../entities/Artista";
import {ArtistaService} from "../../services/artista/artista.service";
import {GeneroService} from "../../services/genero/genero.service";
import {Album} from "../../entities/Album";
import {Router} from "@angular/router";
import {User} from "../../entities/User";
import {LoginServiceService} from "../../services/login/login-service.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-album-creation',
  templateUrl: './album-creation.component.html',
  styleUrl: './album-creation.component.css'
})
export class AlbumCreationComponent implements OnInit{
  albumForm!:FormGroup;
  albumImage!:File;
  generos!:Genero[];
  artistas:Artista[]=[];
  user:User = new User();
  sArtista:Artista=new Artista('','','','', new Genero(),'',this.user, [],0, 0);
  username:any;

  constructor(private albumService:AlbumService,
              private router:Router,
              private artistaService:ArtistaService,
              private generoService:GeneroService,
              private fb:FormBuilder,
              private loginService:LoginServiceService,
              private userService:UserService) {
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
    this.username = this.loginService.getUsername();
    this.userService.selecionarUser(this.username).subscribe(response=>{
      this.user = response;
      console.log("User carregado com sucesso!");
    });

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
      this.sArtista.id=this.albumForm.get('artista')?.value;
      const genero :Genero = new Genero();
      genero.id=this.albumForm.get('genero')?.value;

      const album : Album = new Album('',
        this.albumForm.get('nome')?.value, '',this.albumForm.get('descricao')?.value,
        genero, this.albumForm.get('editora')?.value, this.user,[], this.sArtista, [],0,
        this.albumForm.get('dataLancamento')?.value, 0);

      album.artista = this.sArtista;

      this.albumService.addAlbum(album, this.albumImage).subscribe(response=>{
        alert("ALBUM "+album.titulo+" CRIADO COM SUCESSO");
        this.router.navigate(['/']);
      }, error=>{
        alert("NAO FOI POSSIVEL CRIAR O ALBUM");
        console.log("DEU ERRO: "+error)
      });
    }else{
      alert("ESCOLHA UMA IMAGEM PRO ALBUM!");
    }
  }

}
