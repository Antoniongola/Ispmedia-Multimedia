import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDto} from "../../dtos/LoginDto";
import {Observable} from "rxjs";
import {LoginResponse} from "../../dtos/LoginResponse";
import {SignupDto} from "../../dtos/SignupDto";
import {SignupResponse} from "../../dtos/SignupResponse";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl:string = environment.apiUrl+"/signup";
  constructor(private http: HttpClient) { }

  cadastrar(signup: SignupDto): Observable<SignupResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignupResponse>(this.apiUrl, signup);
  }
}
