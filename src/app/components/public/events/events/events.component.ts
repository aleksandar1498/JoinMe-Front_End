import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { JwtAuthorization } from 'src/app/interceptors/JWTAuthorization';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[];
  roles: string[];
  myEvents: Event[];
  otherEvents: Event[];
  user: UserAuth;
  constructor(
    private eventService: EventsService,
    private notificationService: NotificationService,
    private jwtService: JwtValidationService,
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.roles = this.jwtService.getRoles();
    this.authService.currentUser.subscribe(u => {
      this.user = u;
    });
    this.renderEvents();
  }

  join(event: Event) {
    this.userService.joinEvent(event).subscribe(() => {
      this.eventService.reloadEvents();
    });
  }

  disjoin(event: Event) {
    this.userService.disjoinEvent(event).subscribe(() => {
      this.eventService.reloadEvents();
    });
  }

  markAsInterest(event: Event) {
    this.userService.interestEvent(event).subscribe(() => {
      this.eventService.reloadEvents();
    });
  }

  removeInterest(event: Event) {
    this.userService.removeInterest(event).subscribe(() => {
      this.eventService.reloadEvents();
    });
  }

  cancel(event: Event) {
    const c = confirm('This operation cannot be undone');
    if (c) {
      this.eventService.cancel(event).subscribe(() => {
        this.eventService.reloadEvents();
        this.notificationService.showSuccess('Cancelled');
      });
    }
  }

  renderEvents() {
    this.eventService.reloadEvents();
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res.filter(ev => ev.owner.username !== this.authService.currentUserValue.username);
    });
  }
}
