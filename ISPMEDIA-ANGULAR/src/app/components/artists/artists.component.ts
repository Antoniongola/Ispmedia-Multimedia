import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ArtistaService} from "../../services/artista.service";
import {Artista} from "../../entities/Artista";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})

export class ArtistsComponent {
  imageUrl: any;
  artistas !: Artista[];

  constructor(private artistaService: ArtistaService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.artistaService.getTodosArtistas().subscribe(response=>{
      this.artistas = response;
    }, error=>{
      this.artistas = [];
    })
  }

  loadImage(artistaId: string) {
    this.artistaService.getImage(artistaId).subscribe(response => {
      const objectURL = URL.createObjectURL(response);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error=>{
      console.log(error);
    });
  }
}
