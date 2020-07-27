import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/models/event';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-intersted-events',
  templateUrl: './intersted-events.component.html',
  styleUrls: ['./intersted-events.component.css']
})
export class InterstedEventsComponent implements OnInit {
  events: Event[];
  user: UserAuth;
  constructor(
    private eventService: EventsService,
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(u => {
      this.user = u;
    });
    this.renderEvents();
    console.log(this.events);
  }
  join(event: Event) {
    this.userService.joinEvent(event).subscribe(() => {
      this.userService.reloadEvents();
    });
  }

  disjoin(event: Event) {
    this.userService.disjoinEvent(event).subscribe(() => {
      this.userService.reloadEvents();
    });
  }

  markAsInterest(event: Event) {
    this.userService.interestEvent(event).subscribe(() => {
      this.userService.reloadEvents();
    });
  }

  removeInterest(event: Event) {
    this.userService.removeInterest(event).subscribe(() => {
      this.userService.reloadEvents();
    });
  }

  cancel(event: Event) {
    const c = confirm('This operation cannot be undone');
    if (c) {
      this.eventService.cancel(event).subscribe(() => {
        this.renderEvents();
        this.notificationService.showSuccess('Cancelled');
      });
    }
  }

  renderEvents() {
    this.userService.reloadEvents();
    this.userService.getInterestedEvents().subscribe(res => {
      this.events = res;
    });
  }

}
