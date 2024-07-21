import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Album} from "../../entities/Album";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {Artista} from "../../entities/Artista";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  apiUri:string = environment.apiUrl+"/conteudo/album";
  token=localStorage.getItem('jwtToken');

  constructor(private http:HttpClient,
              private sanitizer: DomSanitizer) { }

  loadImages(albums:Album[], albumImages: { [key: string]: any }) {
    albums.forEach(album => {
      this.getImage(album.id).subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        albumImages[album.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    });
  }

  loadImage(album:Album, albumImages: { [key: string]: any }) {
    this.getImage(album.id).subscribe(response => {
      const objectURL = URL.createObjectURL(response);
      albumImages[album.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUri}/${id}/imagem`, { responseType: 'blob' });
  }

  getAlbums():Observable<Album[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Album[]>(this.apiUri, {headers});
  }

  addAlbum(album:Album, cover:File):Observable<any>{
    const formData = new FormData();
    formData.append('album', new Blob([JSON.stringify(album)], {type:'application/json'}));
    formData.append('albumImage', cover);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any>(this.apiUri, formData, {headers});
  }

  getAlbum(id:string):Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Album>(`${this.apiUri}/${id}`, {headers});
  }
}
