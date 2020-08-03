import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event';
import { NotificationService } from 'src/app/services/notification.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-event-moderator',
  templateUrl: './event-moderator.component.html',
  styleUrls: ['./event-moderator.component.css']
})
export class EventModeratorComponent implements OnInit {
  events: Event[];
  constructor(private eventService: EventsService, private notificationService: NotificationService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.renderEvents();
  }
  ban(event: Event) {
    this.adminService.banEvent(event).subscribe(() => {
      this.renderEvents();
    });
  }
  renderEvents() {
    this.eventService.reloadEvents();
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res.filter(e => !e.cancelled);
    });
  }
}
