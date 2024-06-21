import {Component, OnInit} from '@angular/core';
import {Musica} from "../../entities/Musica";
import {MusicaService} from "../../services/musica/musica.service";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrl: './musics.component.css'
})
export class MusicsComponent implements OnInit{
  musicas!:Musica[];
  musica!:Musica;

  constructor(private musicaService:MusicaService){

  }

  ngOnInit(): void {
  /*
    this.musicaService.getMusicById("9decd238-3d8d-4fbc-b238-706568949e2c").subscribe(response=>{
      this.musica = response;
    })

    this.musicaService.getAllMusics().subscribe(response=>{
      this.musicas = response;
    }, error => {
      console.log('erro nas músicas')
    })
    */
  }

  playMusic(filename: string) {
  /*
    this.musicaService.getMusicById(filename).subscribe(response => {
    this.musica = response;
    const url = window.URL.createObjectURL(this.musica.path);
    const audio = new Audio(url);
    audio.play();

    });*/
  }

}
