import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[];
  myEvents: Event[];
  otherEvents: Event[];
  user: UserAuth;
  constructor(private eventService: EventsService, private notificationService: NotificationService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(u => {
      this.user = u;
    });
    this.renderEvents();
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
    this.eventService.reloadEvents();
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res;
    });
  }
}
