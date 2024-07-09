import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Genero} from "../../entities/Genero";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  url:string="http://localhost:8080/api/genero";
  token=localStorage.getItem('jwtToken');
  constructor(private http: HttpClient) { }

  todosGeneros():Observable<Genero[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Genero[]>(this.url, {headers});
  }
}
