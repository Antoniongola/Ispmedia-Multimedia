import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArtistaService} from "../../services/artista/artista.service";
import {AlbumService} from "../../services/album/album.service";
import {Artista} from "../../entities/Artista";

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrl: './artist-albums.component.css'
})
export class ArtistAlbumsComponent implements OnInit{
  filterValue:any;
  artista!:Artista;
  albumImages: { [key: string]: any } = {};
  constructor(private route: ActivatedRoute,
              private artistaSErvice: ArtistaService,
              private albumService:AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filterValue = params.get('idArtista');
    });

    this.artistaSErvice.getArtista(this.filterValue).subscribe(response=>{
      this.artista = response;
      this.albumService.loadImages(this.artista.albums, this.albumImages);
    })
  }
}
