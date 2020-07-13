import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: Event[];
  user: UserAuth;
  constructor(private eventService: EventsService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(u => {
      this.user = u;
    });
    this.renderEvents();
  }

  join(event: Event) {
    this.userService.joinEvent(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.eventService.reloadEvents();
      }
    });
  }

  disjoin(event: Event) {
    this.userService.disjoinEvent(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.eventService.reloadEvents();
      }
    });
  }

  markAsInterest(event: Event) {
    this.userService.interestEvent(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.eventService.reloadEvents();
      }
    });
  }

  removeInterest(event: Event) {
    this.userService.removeInterest(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        console.log(res);
        this.eventService.reloadEvents();
      }
    });
  }

  cancel(event: Event) {
    console.log(event);
    this.eventService.cancel(event).subscribe(res => {
      if (res.responseCode === 'OK') {
        this.eventService.reloadEvents();
      }
    })
  }

  renderEvents() {
    this.eventService.reloadEvents();
    this.eventService.getEventsForUser().subscribe(res => {
      this.events = res.filter(e => !e.cancelled);
    });
  }
}
