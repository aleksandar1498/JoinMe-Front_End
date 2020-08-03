import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotifierComponent } from 'src/app/components/common/notification/error/error-notifier/error-notifier.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
  categories: LocationCategory[];
  createLocationForm = new FormGroup({
    city: new FormControl(''),
    address: new FormControl(''),
    locationCategory: new FormControl(null)
  });
  constructor(private _locationService: LocationService, private _router: Router, private errorService: ErrorService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.categories = Object.values(LocationCategory).map(key => {
      return LocationCategory[key];
    }).filter(auth => {
      return !isNaN(Number(LocationCategory[auth]));
    });
  }

  create() {
    const newLocation: Location = Object.setPrototypeOf(this.createLocationForm.value, Location.prototype);

    this._locationService.create(newLocation).subscribe(() => {
      this.notificationService.showSuccess('Location created');
      this._router.navigateByUrl('/locations');
    },
      (err: HttpErrorResponse) => {
        this.errorService.renderServerErrors(this.createLocationForm, err);
      });
  }

}
