import {Component, OnInit} from '@angular/core';
import {ArtistaService} from "../../services/artista/artista.service";
import {Artista} from "../../entities/Artista";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit{
  artistas !: Artista[];
  artistImages: { [key: string]: any } = {};

  constructor(private artistService: ArtistaService) {
  }

  ngOnInit(){
    this.artistService.getTodosArtistas().subscribe(response=>{
      this.artistas = response;
      this.artistService.loadImages(this.artistas, this.artistImages);
    }, error => {
      console.log('erro nos artistas: '+error);
    });
  }
}
