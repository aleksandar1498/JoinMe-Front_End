import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/models/event';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  user: UserAuth;
  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(u => {
      this.user = u;
    });

    this.renderEvent();
  }

  join(event: Event) {
    this.userService.joinEvent(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.renderEvent();
      }
    });
  }

  disjoin(event: Event) {
    this.userService.disjoinEvent(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.renderEvent();
      }
    });
  }

  markAsInterest(event: Event) {
    this.userService.interestEvent(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.renderEvent();
      }
    });
  }

  removeInterest(event: Event) {
    this.userService.removeInterest(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.renderEvent();
      }
    });
  }

  cancel(event: Event) {
    const c = confirm('This operation cannot be undone');
    if (c) {
      this.eventService.cancel(event).subscribe(() => {
        this.renderEvent();
        this.notificationService.showSuccess('Cancelled');
      });
    }

  }

  renderEvent() {
    const eventId = this.route.snapshot.params.id;
    this.eventService.getEventById(eventId).subscribe(res => {
      console.log(res);
      res.joinedUsers = res.joinedUsers.map(u => {
        return u['user']['username'];
      });
      res.interestedUsers = res.interestedUsers.map(u => {
        return u['user']['username'];
      });
      this.event = Object.setPrototypeOf(res, Event.prototype);
    });
  }

}
