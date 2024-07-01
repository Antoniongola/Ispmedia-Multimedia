import { Injectable } from '@angular/core';
import {MusicaService} from "../musica/musica.service";
import {VideoService} from "../video/video.service";
import {Conteudo} from "../../entities/Conteudo";
import {Musica} from "../../entities/Musica";
import {Video} from "../../entities/Video";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {

  constructor(private musicService:MusicaService,
              private videoService:VideoService,
              private sanitizer:DomSanitizer) { }

  loadConteudos(conteudos:(Musica|Video)[], srcs: { [key: string]: any }){
    console.log("tamanho da lista: "+conteudos.length);
    conteudos.forEach(conteudo=>{
      if(conteudo.dataType=="musica"){
        this.musicService.getMusicById(conteudo.id).subscribe(response => {
          const objectURL = URL.createObjectURL(response);
          srcs[conteudo.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      }else if(conteudo.dataType=="video"){
        this.videoService.videoStream(conteudo.id).subscribe(response => {
          const objectURL = URL.createObjectURL(response);
          srcs[conteudo.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      }
    });
  }
}
