import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Participante} from "../../entities/Participante";
import {ParticipanteDto} from "../../dtos/ParticipanteDto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {
  private baseUrl = environment.apiUrl+'/participante';
  token = localStorage.getItem('jwtToken');

  constructor(private http: HttpClient) { }

  getParticipantesByGroup(groupId: number): Observable<Participante[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Participante[]>(`${this.baseUrl}/${groupId}`);
  }

  makeGroupRole(participante: number, dto: ParticipanteDto): Observable<Participante> {
    return this.http.put<Participante>(`${this.baseUrl}/${participante}`, dto);
  }

  isGroupAdmin(group: number, username: string): Observable<boolean> {
    const url = `${this.baseUrl}/${group}/${username}/owner`;
    return this.http.get<boolean>(url);
  }

  isGroupEditor(group: number, username: string): Observable<boolean> {
    const url = `${this.baseUrl}/${group}/${username}/editor`;
    return this.http.get<boolean>(url);
  }
}
