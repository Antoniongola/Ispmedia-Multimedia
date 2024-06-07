import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../../entities/Album";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  apiUri:string = "http://localhost:8080/api/conteudo/album";

  constructor(private http:HttpClient) { }

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
