import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../../services/album/album.service";
import {Album} from "../../entities/Album";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit{
  albums : Album[] = [];
  albumImages: { [key: string]: any } = {};

  constructor(private albumService : AlbumService){
    this.albumService.getAlbums().subscribe(response=>{
      this.albums = response;
      this.albumService.loadImages(this.albums, this.albumImages);
    }, error=>{
      console.log('Erro nos albuns: '+error);
    })
  }
  ngOnInit(){

  }
}
