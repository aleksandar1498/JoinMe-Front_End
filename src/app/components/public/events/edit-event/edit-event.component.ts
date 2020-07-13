import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event';
import { Location } from 'src/app/models/location';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EventCategory } from 'src/app/models/enums/event-category';
import { LocationService } from 'src/app/services/location.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  location: Location;
  editEventForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl( {value : '', disabled: true }),
    description: new FormControl(''),
    location: new FormControl( {value : null, disabled: true }),
    category: new FormControl( {value : null, disabled: true }),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });
  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.renderEvent();
  }

  get eventCategories() { return Object.keys(EventCategory).slice(Object.keys(EventCategory).length / 2); }
  renderEvent() {
    const eventId = this.route.snapshot.params.id;
    this.eventService.getEventById(eventId).subscribe(res => {
      this.location = Object.setPrototypeOf(res.location, Location.prototype);
      this.editEventForm.get('title').setValue(res.title);
      this.editEventForm.get('id').setValue(res.id);
      this.editEventForm.get('description').setValue(res.description);
      this.editEventForm.get('location').setValue(res.location.city + ' ' + res.location.address);
      this.editEventForm.get('category').setValue(res.category);
      this.editEventForm.get('startDate').setValue(res.startDate);
      this.editEventForm.get('endDate').setValue(res.endDate);
    });
  }

  edit() {
    this.editEventForm.get('location').setValue(this.location);
    const event: Event = Object.setPrototypeOf(this.editEventForm.value, Event.prototype);
    console.log(event);
    this.eventService.edit(event).subscribe(
      data => {
        this.router.navigateByUrl("/events")
      },
      (err: HttpErrorResponse) => {
        const validationErrors = err.error;
        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.editEventForm.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: validationErrors[prop]
            });
          }
        });
      });
  }
}
