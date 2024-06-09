import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../../entities/Album";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {Artista} from "../../entities/Artista";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  apiUri:string = "http://localhost:8080/api/conteudo/album";

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
    return this.http.get<Album[]>(this.apiUri);
  }

  addAlbum(album:Album, cover:File):Observable<any>{
    console.log('antes de enviar o mambo: '+album);
    const formData = new FormData();
    formData.append('album', new Blob([JSON.stringify(album)], {type:'application/json'}));
    formData.append('albumImage', cover);
  return this.http.post<any>(this.apiUri, formData);
  }

  getAlbum(id:string):Observable<Album>{
    return this.http.get<Album>(`${this.apiUri}/${id}`);
  }


}
