import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { Location } from 'src/app/models/location';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: Location[];
  roles: string[];
  constructor(
    private locationService: LocationService,
    private notificationService: NotificationService,
    private jwtService: JwtValidationService,
    private router: Router) {
    this.renderLocations = this.renderLocations.bind(this);
  }


  ngOnInit(): void {
    this.roles = this.jwtService.getRoles();
    this.renderLocations();
  }

  renderLocations() {
    console.log("Called");
    this.locationService.findAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
    });
  }
  edit(event: any, locationId: string) {
    event.preventDefault();
    const url = '/locations/edit/' + locationId;
    this.router.navigate([url], { queryParams: { returnUrl: '/admin/locations' } });
  }
  remove(event: any, locationId: string) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete the location with ID ' + locationId + '? All the related events will be cancelled.') === true) {
      this.locationService.remove(locationId).subscribe(() => {
        this.notificationService.showSuccess('Location deleted');
        this.renderLocations();
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
    }
  }



}
