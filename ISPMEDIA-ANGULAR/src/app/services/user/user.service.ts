import { Injectable } from '@angular/core';
import {User} from "../../entities/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {SignupDto} from "../../dtos/SignupDto";
import {LoginServiceService} from "../login/login-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';  // Altere para a URL correta do seu backend
  token:any='';

  constructor(private http: HttpClient, private loginService:LoginServiceService) {
    this.token = this.loginService.getToken();
  }

  isAdmin(userId: string|null): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${userId}/roles/admin`);
  }

  isEditor(userId: string|null): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${userId}/roles/editor`);
  }

  idGroupEditor(userId:string|null, groupId:number):Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${userId}/grupo/${groupId}`);
  }

  signUp(dto: SignupDto): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/signup`, dto)
      .pipe(
        catchError(this.handleError<Response>('signUp'))
      );
  }

  promoteUser(userId: string): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/${userId}/promote`, {})
      .pipe(
        catchError(this.handleError<Response>('promoteUser'))
      );
  }

  demoteUser(userId: string): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/${userId}/demote`, {})
      .pipe(
        catchError(this.handleError<Response>('demoteUser'))
      );
  }

  updateUser(user: User, id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<User>(`${this.apiUrl}/user/${id}`, user)
      .pipe(
        catchError(this.handleError<User>('updateUser'))
      );
  }

  deleteUser(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<string>(`${this.apiUrl}/user/${id}`)
      .pipe(
        catchError(this.handleError<string>('deleteUser'))
      );
  }

  selecionarUser(id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<User>(`${this.apiUrl}/user/${id}`)
      .pipe(
        catchError(this.handleError<User>('selecionarUser'))
      );
  }

  selecionarTodosUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<User[]>(`${this.apiUrl}/user`, {headers})
      .pipe(
        catchError(this.handleError<User[]>('selecionarTodosUsers'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
