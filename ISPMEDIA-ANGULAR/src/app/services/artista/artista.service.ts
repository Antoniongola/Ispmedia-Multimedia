import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginServiceService} from "../login/login-service.service";
import {Artista} from "../../entities/Artista";
import {DomSanitizer} from "@angular/platform-browser";


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  private apiUrl:string = "http://localhost:8080/api/conteudo/artista";
  private token = this.loginService.getToken();

  constructor(private http: HttpClient,
              private loginService:LoginServiceService,
              private sanitizer: DomSanitizer) { }

  loadImages(artists:Artista[], artistImages: { [key: string]: any }) {
    artists.forEach(artist => {
      this.getImage(artist.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        artistImages[artist.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    });
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/imagem`, { responseType: 'blob' });
  }

  getImage(id: string) {
    return this.http.get(`${this.apiUrl}/${id}/{imagem}`, { responseType: 'blob' });
  }

  getArtistas():Observable<Artista[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Artista[]>(this.apiUrl);
  }


  getArtista(id: string): Observable<Artista> {
    return this.http.get<Artista>(`${this.apiUrl}/${id}`);
  }

  getTodosArtistas(): Observable<Artista[]> {
    return this.http.get<Artista[]>(this.apiUrl);
  }

  addArtista(artista: Artista, artistaImage:File): Observable<any> {
    const formData:FormData = new FormData();
    formData.append('artista', new Blob([JSON.stringify(artista)], {type:'application/json'}));
    formData.append('artistImage', artistaImage);

    return this.http.post<any>(this.apiUrl, formData);
  }

  updateArtista(id: string, artista: Artista): Observable<Artista> {
    return this.http.put<Artista>(`${this.apiUrl}/${id}`, artista);
  }

  deleteArtista(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

}
