import { Injectable } from '@angular/core';
import {MusicaService} from "../musica/musica.service";
import {VideoService} from "../video/video.service";
import {Conteudo} from "../../entities/Conteudo";
import {Musica} from "../../entities/Musica";
import {Video} from "../../entities/Video";
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {User} from "../../entities/User";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  private apiUrl:string = environment.apiUrl+"/conteudo"
  token:any=localStorage.getItem('jwtToken');

  constructor(private musicService:MusicaService,
              private videoService:VideoService,
              private sanitizer:DomSanitizer,
              private http:HttpClient) { }

  updateConteudo(conteudo: Conteudo, id: string): Observable<Conteudo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Conteudo>(`${this.apiUrl}/${id}`, conteudo, {headers})
      .pipe(
        catchError(this.handleError<Conteudo>('updateUser'))
      );
  }

  loadConteudos(conteudo:(Video|Musica), srcs: { [key: string]: any }){
    //conteudos.forEach(conteudo=>{
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
    //});
  }

  loadImages(conteudos:(Musica|Video)[], srcs: { [key: string]: any }){
    conteudos.forEach(conteudo=>{
      if(conteudo.dataType=="musica"){
        this.musicService.getImage(conteudo.id).subscribe(response => {
          const objectURL = URL.createObjectURL(response);
          srcs[conteudo.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      }else if(conteudo.dataType=="video"){
        this.videoService.videoImage(conteudo.id).subscribe(response => {
          const objectURL = URL.createObjectURL(response);
          srcs[conteudo.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      }
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
