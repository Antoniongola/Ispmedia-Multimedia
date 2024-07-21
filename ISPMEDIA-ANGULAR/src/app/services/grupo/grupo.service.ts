import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Grupo} from "../../entities/Grupo";
import {Observable} from "rxjs";
import {Conteudo} from "../../entities/Conteudo";
import {Video} from "../../entities/Video";
import {Musica} from "../../entities/Musica";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private baseUrl = environment.apiUrl+'/grupo';
  token=localStorage.getItem('jwtToken');

  constructor(private http: HttpClient) { }

  criarGrupo(grupo: Grupo): Observable<Grupo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Grupo>(this.baseUrl, grupo, {headers});
  }

  getGrupo(grupoId: number, userId: string, emissorConvite:string): Observable<Grupo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.baseUrl}/${grupoId}`;
    return this.http.get<Grupo>(url, {headers});
  }

  addParticipante(grupoId: number, userId: string, emissorConvite:string): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.baseUrl}/${grupoId}/${emissorConvite}/participante/${userId}`;
    return this.http.post<Response>(url, {headers});
  }

  addEditor(grupoId: number, userId: string, promotor:string): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.baseUrl}/${grupoId}/${promotor}/editor/${userId}`;
    return this.http.post<Response>(url, {headers});
  }

  todosGrupos(): Observable<Grupo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Grupo[]>(this.baseUrl, {headers});
  }

  todosGruposDoUser(userId: string): Observable<Grupo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Grupo[]>(`${this.baseUrl}/user/${userId}`, {headers});
  }

  addConteudoGrupo(grupoId: string, conteudo: Musica|Video): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.baseUrl}/${grupoId}`;
    return this.http.put<Response>(url, conteudo, { headers });
  }

  apagarGrupo(grupoId: string): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.baseUrl}/${grupoId}`;
    return this.http.delete<Response>(url, { headers });
  }
}
