import { Injectable } from '@angular/core';
import {Playlist} from "../../entities/Playlist";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'http://localhost:8080/api/playlist';

  constructor(private http: HttpClient) { }

  newPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.baseUrl, playlist);
  }

  allPlaylist(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseUrl);
  }
}
