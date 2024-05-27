import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginServiceService} from "./login-service.service";
import {Artista} from "../entities/Artista";


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  private apiUrl:string = "http://localhost:8080/api/conteudo/artista";
  private token = this.loginService.getToken();

  constructor(private http: HttpClient, private loginService:LoginServiceService) { }

  getArtistas():Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //console.log(this.http.get<any>(this.apiUrl));
    return this.http.get<any>(this.apiUrl);
  }


  getArtista(id: string): Observable<Artista> {
    return this.http.get<Artista>(`${this.apiUrl}/${id}`);
  }

  getTodosArtistas(): Observable<Artista[]> {
    return this.http.get<Artista[]>(this.apiUrl);
  }

  addArtista(artista: Artista): Observable<Artista> {
    return this.http.post<Artista>(this.apiUrl, artista);
  }

  updateArtista(id: string, artista: Artista): Observable<Artista> {
    return this.http.put<Artista>(`${this.apiUrl}/${id}`, artista);
  }

  deleteArtista(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

}
