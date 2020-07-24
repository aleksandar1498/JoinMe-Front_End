import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotifierComponent } from 'src/app/components/common/notification/error/error-notifier/error-notifier.component';
import { HttpErrorResponse } from '@angular/common/http';

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
  constructor(private _locationService: LocationService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categories = Object.values(LocationCategory).map(key => {
      return LocationCategory[key];
    }).filter(auth => {
      return !isNaN(Number(LocationCategory[auth]));
    });
  }

  create() {
    const newLocation: Location = Object.setPrototypeOf(this.createLocationForm.value, Location.prototype);
    this._locationService.create(newLocation).subscribe(data => {
      this._router.navigateByUrl('/admin/locations');
    },
      (err: HttpErrorResponse) => {
        for (const prop of Object.keys(err.error)) {
          const formControl = this.createLocationForm.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: err.error[prop]
            });
          } else {
            this._snackBar.openFromComponent(ErrorNotifierComponent, { data: { error: err.error.error } });
            break;
          }
        }
      });
  }

}