import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from 'src/app/models/location';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorNotifierComponent } from 'src/app/components/common/notification/error/error-notifier/error-notifier.component';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnInit {
  updateLocationForm = new FormGroup({
    id: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    locationCategory: new FormControl(null),
  });
  returnUrl: string;
  constructor(private _locationService: LocationService, private _router: Router, private current: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.current.params.subscribe(res => {
      this._locationService.findById(res.id).subscribe(data => {
        this.updateLocationForm.setValue(data);
      });
    })
    this.current.queryParams.subscribe(res => {
      this.returnUrl = res.returnUrl ? res.returnUrl : '/locations';
    });
  }

  update() {
    const updatedLocation: Location = Object.setPrototypeOf(this.updateLocationForm.value, Location.prototype);
    this._locationService.update(updatedLocation).subscribe(data => {
      if (typeof this.returnUrl !== 'undefined') {
        this._router.navigateByUrl(this.returnUrl);
      } else {
        this._router.navigateByUrl('/locations');
      }
    },
      (err: HttpErrorResponse) => {
        for (const prop of Object.keys(err.error)) {
          const formControl = this.updateLocationForm.get(prop);
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
