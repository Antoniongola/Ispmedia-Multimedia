import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Critica} from "../../entities/Critica";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CriticaService {
  apiUrl='https://localhost:8443/api/critica';
  token=localStorage.getItem('jwtToken');
  constructor(private http:HttpClient) {  }

  fazerCritica(critica: Critica):Observable<Critica>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Critica>(`${this.apiUrl}`, critica, {headers});
  }

  getAlbumCriticas(albumId:string):Observable<Critica[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Critica[]>(`${this.apiUrl}/${albumId}`, {headers});
  }
}
