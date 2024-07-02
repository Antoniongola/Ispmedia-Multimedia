
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LongPollingService {

  private notificationsUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(username:string): Observable<string> {
    return this.http.get(this.notificationsUrl+`/${username}`, { responseType: 'text' });
  }

  longPollNotifications(username:string) {
    this.getNotifications(username).subscribe(
      (notification) => {
        console.log('Notification received: ', notification);
        // Aqui você pode adicionar lógica para tratar a notificação recebida

        // Recomeçar o long polling
        this.longPollNotifications(username);
      },
      (error) => {
        console.error('Error in long polling', error);
        // Adicionar lógica de tratamento de erros e, opcionalmente, recomeçar o polling após um tempo
        setTimeout(() => this.longPollNotifications(username), 5000);
      }
    );
  }
}
