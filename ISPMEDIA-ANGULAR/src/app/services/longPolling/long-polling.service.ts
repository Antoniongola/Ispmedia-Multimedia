
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LongPollingService {

  private notificationsUrl = 'https://localhost:8443/api/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(username:string): Observable<string> {
    return this.http.get(this.notificationsUrl+`/${username}`, { responseType: 'text' });
  }

  longPollNotifications(username: string, callback: (notification: string) => void) {
    this.getNotifications(username).subscribe(
      (notification) => {
        callback(notification);
        // Recomeçar o long polling
        this.longPollNotifications(username, callback);
      },
      (error) => {
        console.error('Error in long polling', error);
        // Adicionar lógica de tratamento de erros e, opcionalmente, recomeçar o polling após um tempo
        setTimeout(() => this.longPollNotifications(username, callback), 5000);
      }
    );
  }
}
