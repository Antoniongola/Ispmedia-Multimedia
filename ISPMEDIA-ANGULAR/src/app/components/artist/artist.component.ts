import {Component, OnInit} from '@angular/core';
import {Artista} from "../../entities/Artista";
import {ActivatedRoute} from "@angular/router";
import {ArtistaService} from "../../services/artista/artista.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit{
  artist!:Artista;
  filterValue!:any;
  imgSrc:{ [key: string]: any } = {};
  constructor(private route: ActivatedRoute,
              private artistaService: ArtistaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filterValue = params.get('idArtista');
    });

    this.artistaService.getArtista(this.filterValue).subscribe(response=>{
      this.artist = response;
      this.artistaService.loadImage(this.artist, this.imgSrc);
      console.log("link da iammem do artista "+this.imgSrc);
    }, error=>{
      console.log('ERRO NO ARTISTA');
    })
  }
}
