import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';
import { EventCategory } from 'src/app/models/enums/event-category';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  locations = {};
  createEventForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(null),
    category: new FormControl(null),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });
  get eventCategories() { return Object.keys(EventCategory).slice(Object.keys(EventCategory).length / 2); }
  constructor(private eventService: EventsService, private router: Router, private locationService: LocationService) {

  }

  ngOnInit(): void {
    this.renderLocations();
  }

  create() {
    const event: Event = Object.setPrototypeOf(this.createEventForm.value, Event.prototype);
    this.eventService.create(event).subscribe(
      data => {
        this.router.navigateByUrl("/events")
      },
      (err: HttpErrorResponse) => {
        const validationErrors = err.error;

        Object.keys(validationErrors).forEach(prop => {
          const formControl = this.createEventForm.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: validationErrors[prop]
            });
          }
        });
      });
  }

  renderLocations() {
    this.locationService.findAllLocations().subscribe(res => {
      res.forEach(l => {
        if (typeof this.locations[l.city] === 'undefined') {
          this.locations[l.city] = [l];
        } else {
          this.locations[l.city] = Array.from(this.locations[l.city]).concat(l);
        }
      });
    });
  }

}
