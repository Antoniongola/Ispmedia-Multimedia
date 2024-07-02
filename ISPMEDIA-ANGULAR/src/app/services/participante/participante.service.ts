import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipanteDto } from './dto/ParticipanteDto';
import {Participante} from "../../entities/Participante";

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {
  private baseUrl = 'http://localhost:8080/api/participante';

  constructor(private http: HttpClient) { }

  getParticipantesByGroup(groupId: number): Observable<Participante[]> {
    return this.http.get<Participante[]>(`${this.baseUrl}/${groupId}`);
  }

  makeGroupEditor(groupId: number, dto: ParticipanteDto): Observable<Participante> {
    return this.http.put<Participante>(`${this.baseUrl}/${groupId}`, dto);
  }
}
