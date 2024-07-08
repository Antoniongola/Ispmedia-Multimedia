import {Component, OnInit} from '@angular/core';
import {LongPollingService} from "../../services/longPolling/long-polling.service";
import {LoginServiceService} from "../../services/login/login-service.service";

@Component({
  selector: 'app-long-polling-news',
  templateUrl: './long-polling-news.component.html',
  styleUrl: './long-polling-news.component.css'
})
export class LongPollingNewsComponent implements OnInit {

  notifications: string[] = [];
  username: any = ''; // Substitua pelo nome de usuário real

  constructor(private notificationService: LongPollingService,
              private loginApi:LoginServiceService) { }

  ngOnInit() {
    this.notifications=[];
    this.username=this.loginApi.getUsername();
    this.notificationService.longPollNotifications(this.username, (notification) => {
      if(!this.notifications.includes(notification))
        this.notifications.push(notification);
    });
  }
}
