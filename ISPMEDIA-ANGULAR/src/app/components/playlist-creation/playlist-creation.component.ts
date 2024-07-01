import {Component, OnInit} from '@angular/core';
import {MusicaService} from "../../services/musica/musica.service";
import {Musica} from "../../entities/Musica";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Artista} from "../../entities/Artista";
import {Genero} from "../../entities/Genero";
import {User} from "../../entities/User";
import {VideoService} from "../../services/video/video.service";
import {Video} from "../../entities/Video";
import {LoginServiceService} from "../../services/login/login-service.service";
import {Playlist} from "../../entities/Playlist";
import {Privacidade} from "../../entities/enums/Privacidade";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {Router} from "@angular/router";
import {Conteudo} from "../../entities/Conteudo";

@Component({
  selector: 'app-playlist-creation',
  templateUrl: './playlist-creation.component.html',
  styleUrl: './playlist-creation.component.css'
})
export class PlaylistCreationComponent implements OnInit{
  playlistForm!:FormGroup;
  musicas!:Musica[];
  videosList!:Video[];
  conteudoFinal:(Musica|Video)[]=[];
  submittedItems:any[]=[];
  submittedVideos:any[]=[];
  publico:Privacidade=Privacidade.PUBLICO;
  privado:Privacidade=Privacidade.PRIVADO;

  constructor(private musicaService:MusicaService,
              private videoService:VideoService,
              private loginService:LoginServiceService,
              private playlistService:PlaylistService,
              private router:Router,
              private fb:FormBuilder) {}

  ngOnInit() {
    this.playlistForm = this.fb.group({
      nome:['', Validators.required],
      privacidade:['', Validators.required],
      items: this.fb.array([this.createItem()]),
      videos:this.fb.array([this.createVideo()]),
    });

    this.videoService.allVideos().subscribe(response=>{
      this.videosList = response;
    });

    this.musicaService.getAllMusics().subscribe(response=>{
      this.musicas=response;
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  createVideo(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  get items(): FormArray {
    return this.playlistForm.get('items') as FormArray;
  }

  get videos():FormArray {
    return this.playlistForm.get('videos') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  addVideo() {
    this.videos.push(this.createVideo());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  removeVideo(index:number){
    this.videos.removeAt(index);
  }

  onSubmit(){
    let username :any = this.loginService.getUsername();
    this.submittedItems = this.playlistForm.value.items;
    this.submittedVideos = this.playlistForm.value.videos;
    let user = new User();
    user.username = username;

    this.submittedItems.map(id=>{
      let artista!:Artista;
      let musica:Musica=new Musica(id.name, '', '', '',
        new Genero(), '', user,artista,[], null, 0,'', '', '', 0);
      this.conteudoFinal.push(musica);
    });

    this.submittedVideos.map(id=>{
      let video:Video=new Video(id.name, '', '', '', new Genero(), '', user);
      this.conteudoFinal.push(video);
    });

    let playlist = new Playlist();
    playlist.owner=user;

    if(this.playlistForm.get('privacidade')?.value==1)
      playlist.privacidade=this.privado;
    else if(this.playlistForm.get('privacidade')?.value==0)
      playlist.privacidade=this.publico;

    playlist.titulo = this.playlistForm.get('nome')?.value;
    playlist.conteudos = this.conteudoFinal;

    this.playlistService.newPlaylist(playlist).subscribe(response=>{
      alert('Playlist '+playlist.titulo+' criada com sucesso!');
      this.router.navigate(['/']);
    },error=>{
      this.conteudoFinal = [];
      alert('Erro na criação da playlist!');
    });
  }

  protected readonly Privacidade = Privacidade;
}
