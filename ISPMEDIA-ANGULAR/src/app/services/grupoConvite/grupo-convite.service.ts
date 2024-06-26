import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GrupoConvite} from "../../entities/GrupoConvite";
import {Response} from "../../entities/Response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GrupoConviteService {
  private apiUrl = 'http://localhost:8080/api/convite';  // Base URL for the API
  token=localStorage.getItem('jwtToken');
  constructor(private http: HttpClient) { }

  // Method to create a new convite
  criarConvite(convite: GrupoConvite): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Response>(`${this.apiUrl}`, convite, {headers});
  }

  // Method to respond to a convite
  responderConvite(conviteId: number, resposta: number): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Response>(`${this.apiUrl}/${conviteId}/${resposta}`, {headers});
  }
}
