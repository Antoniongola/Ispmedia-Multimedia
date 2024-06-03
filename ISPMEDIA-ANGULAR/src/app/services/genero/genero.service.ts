import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genero} from "../../entities/Genero";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http:HttpClient) { }

  todosGeneros():Observable<Genero[]>{
    return this.http.get<Genero[]>("http://localhost:8080/api/genero");
  }
}
