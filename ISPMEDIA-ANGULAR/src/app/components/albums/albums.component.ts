import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../../services/album/album.service";
import {Album} from "../../entities/Album";
import {ArtistaService} from "../../services/artista/artista.service";
import {Artista} from "../../entities/Artista";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit{
  albums : Album[] = [];
  albumImages: { [key: string]: any } = {};
  finalAlbums : Album[] = [];
  artistas:Artista[]=[];

  constructor(private albumService : AlbumService,
              private artistaService:ArtistaService){
  }

  ngOnInit(){
    this.albumService.getAlbums().subscribe(response=>{
      this.albums = response;
      this.artistaService.getArtistas().subscribe(response=>{
        this.artistas=response;
      });

      this.albums.forEach(album=>{
        this.artistas.forEach(artista=>{
          if(artista.albums.includes(album)){
            console.log('Dono do album '+album.titulo+', '+artista.titulo);
          }
        })
      });

      this.albumService.loadImages(this.albums, this.albumImages);
    }, error=>{
      console.log('Erro nos albuns: '+error);
    })
  }
}
