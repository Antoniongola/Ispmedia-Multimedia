import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notificacao} from "../../entities/Notificacao";

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private apiUrl = 'http://localhost:8080/api/notificacao';  // Base URL for the API

  constructor(private http: HttpClient) { }

  // Method to get notifications for a specific user
  getUserNotifications(username: string): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${this.apiUrl}/${username}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Method to get all notifications
  getAllNotifications(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${this.apiUrl}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
