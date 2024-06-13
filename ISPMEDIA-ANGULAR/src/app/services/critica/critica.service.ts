import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Critica} from "../../entities/Critica";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CriticaService {

  apiUrl='http://localhost:8080/api/critica'
  constructor(private http:HttpClient) {

  }

  fazerCritica(critica: Critica, albumId: string):Observable<Critica>{
    return this.http.post<Critica>(`${this.apiUrl}/${albumId}`, critica);
  }
}
