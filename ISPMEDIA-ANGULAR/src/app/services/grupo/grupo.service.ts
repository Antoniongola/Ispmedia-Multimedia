import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Grupo} from "../../entities/Grupo";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private baseUrl = 'http://localhost:8080/api/grupo';

  constructor(private http: HttpClient) { }

  criarGrupo(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.baseUrl, grupo);
  }

  addParticipante(grupoId: number, userId: string, emissorConvite:string): Observable<Response> {
    const url = `${this.baseUrl}/${grupoId}/${emissorConvite}/participante/${userId}`;
    return this.http.post<Response>(url, {});
  }

  addEditor(grupoId: number, userId: string, promotor:string): Observable<Response> {
    const url = `${this.baseUrl}/${grupoId}/${promotor}/editor/${userId}`;
    return this.http.post<Response>(url, {});
  }

  todosGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.baseUrl);
  }

  todosGruposDoUser(userId: string): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/user/${userId}`);
  }
}
