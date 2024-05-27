import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDto} from "../../dtos/LoginDto";
import {Observable} from "rxjs";
import {LoginResponse} from "../../dtos/LoginResponse";
import {SignupDto} from "../../dtos/SignupDto";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl:string = "http://localhost:8080/api/signup";
  constructor(private http: HttpClient) { }

  cadastrar(signup: SignupDto): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(this.apiUrl, signup);
  }
}
