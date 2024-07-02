import {Component, OnInit} from '@angular/core';
import {Musica} from "../../entities/Musica";
import {MusicaService} from "../../services/musica/musica.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrl: './musics.component.css'
})
export class MusicsComponent implements OnInit{
  musicas:Musica[]=[];
  musica!:Musica;
  musicaSrcs: { [key: string]: any } = {}
  imgSrcs: { [key: string]: any } = {}
  mediaId:any="";
  constructor(private musicaService:MusicaService,
              private router:ActivatedRoute){
    this.router.paramMap.subscribe(response=>{
      this.mediaId = response.get('musicId');
    });

    this.musicaService.getAllMusics().subscribe(response=>{
      this.musicas = response;
      this.musicaService.loadImages(this.musicas, this.imgSrcs);
      this.musicaService.loadMusicas(this.musicas, this.musicaSrcs);
    }, error => {
      console.log('erro nas músicas')
    });
  }

  ngOnInit(): void {

  }

  playMusic(filename: string) {
    this.mediaId=filename;
    console.log('id: '+filename);
  }

}
