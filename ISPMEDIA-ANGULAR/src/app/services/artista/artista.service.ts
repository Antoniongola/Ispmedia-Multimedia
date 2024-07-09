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

  loadImage(artists:Artista, artistImages: { [key: string]: any }) {
      this.getImage(artists.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        artistImages[artists.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/imagem`, { responseType: 'blob' });
  }

  getArtistas():Observable<Artista[]> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Artista[]>(this.apiUrl, {headers});
  }


  getArtista(id: string): Observable<Artista> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Artista>(`${this.apiUrl}/${id}`, {headers});
  }

  getTodosArtistas(): Observable<Artista[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Artista[]>(this.apiUrl, {headers});
  }

  addArtista(artista: Artista, artistaImage:File): Observable<any> {
    const formData:FormData = new FormData();
    console.log("nome: "+artista.titulo);
    formData.append('artista', new Blob([JSON.stringify(artista)], {type:'application/json'}));
    formData.append('artistImage', artistaImage);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.apiUrl, formData, {headers});
  }

  updateArtista(id: string, artista: Artista): Observable<Artista> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Artista>(`${this.apiUrl}/${id}`, artista, {headers});
  }

  deleteArtista(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {headers});
  }

}
