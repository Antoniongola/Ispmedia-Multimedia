import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Musica} from "../../entities/Musica";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private apiUrl = 'http://localhost:8080/api/musica';

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) { }

  addMusica(musica: Musica, musicFile:File, musicImage:File|string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('musica', new Blob([JSON.stringify(musica)], {type:'application/json'}));
    formData.append('musicFile', musicFile);
    formData.append('musicImage', musicImage);
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  loadImages(musics:Musica[], musicaImages: { [key: string]: any }) {
    musics.forEach(musica => {
      this.getImage(musica.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        musicaImages[musica.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    });
  }

  loadImage(musica:Musica, musicaImages: { [key: string]: any }) {
    this.getImage(musica.id).subscribe(response => {
      const objectURL = URL.createObjectURL(response);
      musicaImages[musica.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  loadMusicas(musicas:Musica[]|null, musicaSrcs: { [key: string]: any }) {
    if(musicas!=null && musicas.length>0){
      console.log('tá entar no loop da musica')
      musicas.forEach(musica => {
        this.getMusicById(musica.id).subscribe(response => {
          const objectURL = URL.createObjectURL(response);
          musicaSrcs[musica.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      });
    }
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/imagem`, { responseType: 'blob' });
  }

  getAllMusics(): Observable<Musica[]> {
    return this.http.get<Musica[]>(this.apiUrl);
  }

  getMusicById(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }

  deleteMusic(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
