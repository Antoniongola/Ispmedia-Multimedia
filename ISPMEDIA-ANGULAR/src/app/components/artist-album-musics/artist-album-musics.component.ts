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
import {Genero} from "../../entities/Genero";
import {Artista} from "../../entities/Artista";

@Component({
  selector: 'app-artist-album-musics',
  templateUrl: './artist-album-musics.component.html',
  styleUrl: './artist-album-musics.component.css'
})
export class ArtistAlbumMusicsComponent implements OnInit{
  hasCommented:boolean=false;
  criticas:Critica[]=[];
  criticaForm!:FormGroup;
  artista: Artista=new Artista('', '', '', '', new Genero(), '',
    new User(), [], 0, 0);
  album:Album=new Album('', '', '', '', new Genero(), '',
    new User(), [], this.artista, [], 0 , '', 0);
  albumId:any='';
  audio:any;
  musicId:string='';
  albumImage:{[key:string] : any} = {};
  criticoUsername:any="";
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
    this.criticaForm = this.fb.group({
      nota:['', Validators.required],
      critica:['', Validators.required]
    })

    this.route.paramMap.subscribe(params=>{
      this.albumId = params.get('idAlbum');
      this.mostrarCriticas(this.albumId);
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

  mostrarCriticas(albumId:string){
    this.criticaService.getAlbumCriticas(albumId).subscribe(response=>{
      this.criticas = response;
      this.criticas.forEach(critica=>{
        if(critica.critico.username.toLowerCase()==this.criticoUsername.toLowerCase())
          this.hasCommented=true;
      })
    }, error=>{
      console.log("erro nas criticas!!");
    })
  }

  onSubmit(){
    let criticoUser = new User();
    criticoUser.username=this.criticoUsername;
    const artista: Artista=new Artista('', '', '', '', new Genero(), '',
      new User(), [], 0, 0);
    let albumUpload = new Album(this.albumId, '', '', '',new Genero(),'', new User(),
      [], artista, [], 0, '0', 0);

    const critica:Critica=new Critica(0,
      this.criticaForm.get('nota')?.value,
      this.criticaForm.get('critica')?.value,
      criticoUser, albumUpload);

      this.criticaService.fazerCritica(critica).subscribe(response=>{
        alert('CRITICA ADICIONADA COM SUCESSO AO ALBUM. '+response.critica);
        this.mostrarCriticas(this.album.id);
        //this.router.navigate(['../']);
      }, error=>{
        alert('A descrição apenas deve ter de 0 á 300 caracteres, Por favor reveja sua descrição');
      });
  }
}
