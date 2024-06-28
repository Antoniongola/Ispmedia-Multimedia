import {Component, OnInit} from '@angular/core';
import {Album} from "../../entities/Album";
import {AlbumService} from "../../services/album/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Critica} from "../../entities/Critica";
import {CriticaService} from "../../services/critica/critica.service";
import {User} from "../../entities/User";
import {LoginServiceService} from "../../services/login/login-service.service";
import {UserService} from "../../services/user/user.service";
import {Musica} from "../../entities/Musica";
import {MusicaService} from "../../services/musica/musica.service";

@Component({
  selector: 'app-artist-album-musics',
  templateUrl: './artist-album-musics.component.html',
  styleUrl: './artist-album-musics.component.css'
})
export class ArtistAlbumMusicsComponent implements OnInit{
  criticaForm!:FormGroup;
  album!:Album;
  albumId:any='';
  audio:any;
  musicId:string='';
  albumImage:{[key:string] : any} = {};
  criticoUsername:any="";
  critico!:User;
  musicas:Musica[] | null=[];
  url:any=''
  musica!:any;
  musicasSrc:{[key:string]:any}={}

  constructor(private albumService: AlbumService,
              private criticaService:CriticaService,
              private route:ActivatedRoute,
              private fb:FormBuilder,
              private loginService:LoginServiceService,
              private userService:UserService,
              private musicaService:MusicaService) {
  }

  ngOnInit(){
    this.criticoUsername=this.loginService.getUsername();
    this.userService.selecionarUser(this.criticoUsername).subscribe(response=>{
      this.critico = response;
      console.log("CRITICO CARREGADO COM SUCESSO!")
    }, error=>{
      console.log("NÃO FOI POSSÍVEL CARREGAR O CRÍTICO.");
    });
    this.criticaForm = this.fb.group({
      nota:['', Validators.required],
      critica:['', Validators.required]
    })

    this.route.paramMap.subscribe(params=>{
      this.albumId = params.get('idAlbum');
    });

    this.albumService.getAlbum(this.albumId).subscribe(response=>{
      this.album = response;
      this.albumService.loadImage(this.album, this.albumImage);
      this.musicas = this.album.musics;
      this.musicaService.loadMusicas(this.musicas, this.musicasSrc);
    });
  }

  playMusic(filename: string): void {
    this.musicaService.getMusicById(filename).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      this.audio = new Audio(url);
      const teste = new Audio(url);
      this.url = url;
      console.log('teste: '+url);
      teste.play();
    }, error => {
      console.error('Error fetching music file:', error);
    });
  }

  onSubmit(){
    const critica:Critica=new Critica(0,
      this.criticaForm.get('nota')?.value,
      this.criticaForm.get('critica')?.value,
      this.critico, this.album);

      this.criticaService.fazerCritica(critica, this.albumId).subscribe(response=>{
        alert('CRITICA ADICIONADA COM SUCESSO AO ALBUM. '+response.critica);
        //this.router.navigate(['../']);
      }, error=>{
        alert('DEU ERRADO PIDIMO '+error);
      });
  }
}
