import { Injectable } from '@angular/core';
import {Playlist} from "../../entities/Playlist";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Musica} from "../../entities/Musica";
import {Response} from "../../entities/Response";
import {Video} from "../../entities/Video";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'https://localhost:8443/api/playlist';
  token = localStorage.getItem('jwtToken');

  constructor(private http: HttpClient) { }

  newPlaylist(playlist: Playlist): Observable<Playlist> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Playlist>(this.baseUrl, playlist, {headers});
  }

  getPlaylist(id:number): Observable<Playlist> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Playlist>(this.baseUrl+`/${id}`, {headers});
  }

  allPlaylist(): Observable<Playlist[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Playlist[]>(this.baseUrl, {headers});
  }

  allPlaylistPublicas(username:string): Observable<Playlist[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Playlist[]>(this.baseUrl+`/${username}/publicas`, {headers});
  }

  allUserPlaylist(userid: string): Observable<Playlist[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Playlist[]>(`${this.baseUrl}/user/${userid}`, { headers });
  }

  apagarPlaylist(id: string): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<Response>(`${this.baseUrl}/${id}`, { headers });
  }

  addMusicToPlaylist(id: string, musica: Musica|Video): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Response>(`${this.baseUrl}/${id}/musicas`, musica, { headers });
  }
}
