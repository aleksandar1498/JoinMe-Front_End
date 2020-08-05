import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from 'src/app/models/location';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorNotifierComponent } from 'src/app/components/common/notification/error/error-notifier/error-notifier.component';
import { ErrorService } from 'src/app/services/error.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnInit {
  updateLocationForm = new FormGroup({
    id: new FormControl(''),
    city: new FormControl(''),
    name: new FormControl(''),
    locationCategory: new FormControl(null),
  });
  returnUrl: string;
  constructor(
    private locationService: LocationService,
    private router: Router,
    private current: ActivatedRoute,
    private errorService: ErrorService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.current.params.subscribe(res => {
      this.locationService.findById(res.id).subscribe(data => {
        this.updateLocationForm.setValue(data);
      });
    });
  }

  update() {
    const updatedLocation: Location = Object.setPrototypeOf(this.updateLocationForm.value, Location.prototype);
    this.locationService.update(updatedLocation).subscribe(data => {
      this.notificationService.showSuccess('Location Edited');
      this.router.navigateByUrl('/locations');
    },
      (err: HttpErrorResponse) => {
        this.errorService.renderServerErrors(this.updateLocationForm, err);
      });
  }
}
