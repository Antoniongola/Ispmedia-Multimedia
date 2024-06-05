import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Musica} from "../../entities/Musica";

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private apiUrl = 'http://localhost:8080/api/musica';

  constructor(private http: HttpClient) { }

  addMusica(musica: Musica): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}`, musica);
  }

  getAllMusics(): Observable<Musica[]> {
    return this.http.get<Musica[]>(this.apiUrl);
  }

  getMusicById(id: string): Observable<Musica> {
    return this.http.get<Musica>(`${this.apiUrl}/${id}`);
  }

  deleteMusic(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
