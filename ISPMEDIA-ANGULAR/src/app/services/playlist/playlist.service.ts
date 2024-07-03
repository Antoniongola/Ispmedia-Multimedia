import { Injectable } from '@angular/core';
import {Playlist} from "../../entities/Playlist";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'http://localhost:8080/api/playlist';
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

  apagarPlaylist(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }
}
