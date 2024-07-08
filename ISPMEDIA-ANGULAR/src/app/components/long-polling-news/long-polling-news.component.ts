import {Component, OnInit} from '@angular/core';
import {LongPollingService} from "../../services/longPolling/long-polling.service";

@Component({
  selector: 'app-long-polling-news',
  templateUrl: './long-polling-news.component.html',
  styleUrl: './long-polling-news.component.css'
})
export class LongPollingNewsComponent implements OnInit {

  notifications: string[] = [];
  username: string = 'someUsername'; // Substitua pelo nome de usuário real

  constructor(private notificationService: LongPollingService) { }

  ngOnInit() {
    this.notificationService.longPollNotifications(this.username, (notification) => {
      this.notifications.push(notification);
    });
  }
}
