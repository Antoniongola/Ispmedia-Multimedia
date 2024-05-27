import { Injectable } from '@angular/core';
import {LoginDto} from "../dtos/LoginDto";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponse} from "../dtos/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl:string = "http://localhost:8080/api/login";
  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.apiUrl, loginDto);
  }

  /*
  login(loginDto: LoginDto): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, loginDto, { headers, responseType: 'text' });
  }*/

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  deleteToken(): void {
    console.log("token apagado com sucesso");
    localStorage.setItem('jwtToken', '');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
