import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message:string;
  isVisible: boolean;
  isSuccess: boolean;
  constructor(private notificationService : NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.message().subscribe(res => {
      this.message = res;
    });
    this.notificationService.visibility().subscribe(res => {
      this.isVisible = res;
    });

    this.notificationService.type().subscribe(res => {
      this.isSuccess = res;
    })
  }

  


}
